import mongoose from "mongoose"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import Comment from '../models/comment.model.js'


const getVideoComments = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    // const {page = 1, limit = 10} = req.query

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(401, "Invalid video ID")
    }

    const videoComments = await Comment.aggregate([
        {
            $match:{
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField: "owner",
                foreignField: "_id",
                as:"owner",
                pipeline:[
                    {
                        $project:{
                            username: 1,
                            fullName: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                owner:{
                    $first:"$owner"
                }
            }
        }
    ])

    if(!videoComments){
        throw new ApiError(500 , "Something went wrong while fetching comments orThere is no comments")
    }

     return res.status(200)
        .json(new ApiResponse(200,videoComments, "Video Comments fetched successfully"))


})

const addComment = asyncHandler(async (req, res) => {

    const { videoId } = req.params

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(401, "Invalid video ID")
    }

    const { content } = req.body

    if (!content || content == "") {
        throw new ApiError(400, "Empty comment")
    }

    const UserComment = await Comment.create({
        content,
        video: videoId,
        owner: req.user?._id
    })


    if (!UserComment) {
        throw new ApiError(500, "Something went wrong while creating comment")
    }


   const comment = await UserComment.populate("owner", "username avatar")

    console.log("comment", comment);


    return res.status(200)
        .json(new ApiResponse(200, comment, "Comment added to video"))

})

const updateComment = asyncHandler(async (req, res) => {


    const { commentId } = req.params

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(401, "Invalid video ID")
    }

    const { content } = req.body

    if (!content || content == "") {
        throw new ApiError(400, "Empty comment")
    }

    const comment = await Comment.findByIdAndUpdate(commentId,
        
        {
            $set:{
                content
            }
        },
        {
            new:true
        }
       
    ).populate("owner", "username avatar")

    if (!comment) {
        throw new ApiError(500, "Something went wrong while updating comment")
    }

    console.log("---coment update:\n" , comment);
    

    return res.status(200)
        .json(new ApiResponse(200, comment, "Comment updated successfully"))

})

const deleteComment = asyncHandler(async (req, res) => {
   
    const { commentId } = req.params

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(401, "Invalid video ID")
    }

    const comment = await Comment.findByIdAndDelete(commentId)

     if (!comment) {
        throw new ApiError(500, "Something went wrong while deleting comment  or comment doesnot exist anymore")
    }

     return res.status(200)
        .json(new ApiResponse(200, comment, "Comment updated successfully"))


})

export {
    addComment,
    updateComment,
    deleteComment,
    getVideoComments
}