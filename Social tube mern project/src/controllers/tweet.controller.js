import mongoose from "mongoose";
import Tweet from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



// return res.status(200)
//         .json(new ApiResponse(200, userTweets, "usertweets fetched successsfully"))

const createTweet = asyncHandler(async (req, res) => {

    const { content } = req.body

    if (!content || content == "") {
        throw new ApiError(400, "There have to be something to tweet. Empty tweet")
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user?._id
    })

    if (!tweet) {
        throw new ApiError(500, "Something went wrong while posting Tweet")
    }

    return res.status(200)
        .json(new ApiResponse(200, tweet, "Tweet successfull"))

})

const getUserTweets = asyncHandler(async (req, res) => {

    const userTweets = await Tweet.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        }

    ])

    console.log(userTweets)


    return res.status(200)
        .json(new ApiResponse(200, userTweets, "usertweets fetched successsfully"))
})

const updateTweet =asyncHandler(async(req,res)=>{

    const {tweetId} = req.params

    if(!mongoose.isValidObjectId(tweetId)){
        throw new ApiError(400 , "Invalid tweet Id")
    }

    if(!tweetId){
        throw new ApiError(400 , "Tweet Id is importatnt")
    }

    
    const {content} = req.body

    if(!content){
        throw new ApiError(400 , "Cannot send empty tweet")
    }

    const updatedContent = await Tweet.findByIdAndUpdate(tweetId,
        {
            $set:{
                content
            }
        },
        {
            new:true
        }
    )


    if(!updatedContent){
        throw new ApiError(500 ,"Something went wrong while updating tweet")
    }

    
return res.status(200)
        .json(new ApiResponse(200, updatedContent, "Tweet updated successsfully"))

})

const deleteTweet = asyncHandler(async(req,res) =>{

    const {tweetId} = req.params

     if(!mongoose.isValidObjectId(tweetId)){
        throw new ApiError(400 , "Invalid tweet Id")
    }

    if(!tweetId){
        throw new ApiError(400 , "Tweet Id is importatnt")
    }


    const deletedTweet = await Tweet.findByIdAndDelete(tweetId)

      if(!deleteTweet){
        throw new ApiError(500 , "Something went wrong while deleting tweet")
    }

    if(deletedTweet == null){
       return res.status(200)
         .json(new ApiResponse(200, deleteTweet , "Tweet is already deleted or not exist"))
    }

    console.log("\n------deleted tweet------\n",deletedTweet);
    

    return res.status(200)
         .json(new ApiResponse(200, deleteTweet , "Tweet is deleted from database"))
})
 
const getAllTweets = asyncHandler(async(req,res) =>{

    const tweet = await Tweet.find({}).populate("owner", "fullName username avatar").sort({ createdAt: -1 }).lean();

    if(!tweet){
        throw new ApiError(500 , "Something went wrong while fetching tweets")
    }   

    return res.status(200)
    .json(new ApiResponse(200, tweet , "All tweets fetched successsfully"))
})


export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
    getAllTweets
}