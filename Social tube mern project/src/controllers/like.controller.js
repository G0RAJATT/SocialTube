import mongoose from "mongoose";
import Like from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Comment from "../models/comment.model.js";


const toggleVideoLike = asyncHandler(async (req, res) => {

    const { videoId } = req.params

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(401, "Invalid video ID")
    }
    try {

        
        const videoLiked = await Like.create({
            video: videoId,
            likedBy: req.user?._id,
        })
        
        const likeCount = await Like.countDocuments({video: videoId});
        

        console.log("videoLiked: ", videoLiked);
        

        return res.status(200)
            .json(new ApiResponse(200, { videoLiked, likeCount, "liked": true }, "Video is liked by user"))

    } catch (error) {

        if (error.code != 11000) {

            console.log("\n ---- error message ----\n", error.message);
            throw new ApiError(500, "Something went wrong while liking")

        }

        console.log("\n ---- error message ----\n", error.message);
        const deleteLike = await Like.deleteOne({ video: videoId, likedBy: req.user?._id })
        if (!deleteLike.deletedCount === 0) {
            throw new ApiError(500, "Something went wrong while disliking")
        }

        const likeCount = await Like.countDocuments({video: videoId});

        return res.status(200)
            .json(new ApiResponse(200, { likeCount, "liked": false }, "Video is unliked by user"))

    }

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(401, "Invalid video ID")
    }
    try {

        const commentLiked = await Like.create({
            comment: commentId,
            likedBy: req.user?._id,

        })

        const likeCount = await Like.countDocuments({comment: commentId});

        return res.status(200)
            .json(new ApiResponse(200, { commentLiked, likeCount, "liked": true }, "comment is liked by user"))

    } catch (error) {

        if (error.code != 11000) {

            console.log("\n ---- error message ----\n", error.message);
            throw new ApiError(500, "Something went wrong while liking")

        }

        const deleteLike = await Like.deleteOne({ comment: commentId, likedBy: req.user?._id })

        if (!deleteLike.deletedCount === 0) {
            throw new ApiError(500, "Something went wrong while disliking")
        }
        const likeCount = await Like.countDocuments({comment: commentId});

        const commentLiked = {
            "comment": commentId,
        }

        return res.status(200)
            .json(new ApiResponse(200, { commentLiked, likeCount, "liked": false }, "comment is unliked by user"))

    }

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params

    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(401, "Invalid video ID")
    }
    try {

        const tweetLiked = await Like.create({
            tweet: tweetId,
            likedBy: req.user?._id,

        })

        const likeCount = await Like.countDocuments({tweet: tweetId});

        return res.status(200)
            .json(new ApiResponse(200, { tweetLiked, likeCount, "liked": true }, "tweet is liked by user"))

    } catch (error) {

        if (error.code != 11000) {

            console.log("\n ---- error message ----\n", error.message);
            throw new ApiError(500, "Something went wrong while liking")

        }

        const deleteLike = await Like.deleteOne({ tweet: tweetId, likedBy: req.user?._id })

        if (!deleteLike.deletedCount === 0) {
            throw new ApiError(500, "Something went wrong while disliking")
        }
        
        const likeCount = await Like.countDocuments({tweet: tweetId});

        return res.status(200)
            .json(new ApiResponse(200, { likeCount, "liked": false }, "tweet is unliked by user"))

    }

}
)

const getLikedVideos = asyncHandler(async (req, res) => {
   
    const likedVideos = await Like.find({video: { $type: "objectId" }})
    .sort({ createdAt: -1 })
    .lean()

    if(!likedVideos){
        throw new ApiError(500 , "something went wrong while fetching liked videos")
    }

    console.log("liked-videos------\n" , likedVideos);
    

    return res.status(200)
            .json(new ApiResponse(200, likedVideos, "tweet is unliked by user"))
})

const getTotalVideoLikes = asyncHandler(async (req,res) => {

    const {videoId} = req.params

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(401, "Invalid video ID")
    }

    const likeCount = await Like.countDocuments({video: videoId}).lean();

    const liked = await Like.exists({video: videoId , likedBy: req.user?._id})

    return res.status(200)
    .json(new ApiResponse(200 , {likeCount , liked: !!liked} , "Total likes for the video"))


}) 

const getTotalCommentLikes = asyncHandler(async (req,res) => {

    const {commentId} = req.params

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(401, "Invalid comment ID")
    }

    const likeCount = await Like.countDocuments({comment: commentId}).lean();

    const liked = await Like.exists({comment: commentId , likedBy: req.user?._id})

    return res.status(200)
    .json(new ApiResponse(200 , {likeCount , liked: !!liked} , "Total likes for the comment"))


}) 

const getTotalTweetLikes = asyncHandler(async (req,res) => {

    const {tweetId} = req.params

    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(401, "Invalid tweet ID")
    }

    const likeCount = await Like.countDocuments({tweet: tweetId}).lean();

    const liked = await Like.exists({tweet: tweetId , likedBy: req.user?._id})

    return res.status(200)
    .json(new ApiResponse(200 , {likeCount , liked: !!liked} , "Total likes for the tweet"))
})

const getLikedComments = asyncHandler(async (req,res) => {

    const {videoId} = req.params

    const comments = await Comment.find({video: videoId}).select("_id");
    const commentIds = comments.map( c => c._id);


    const likes = await Like.aggregate([
        {
            $match:{
                comment: { $in : commentIds}
            }
        },
        {
            $group:{
                _id: "$comment",
                likeCount: {$sum: 1},
            }
        }
    ])

    const userLikes = await Like.find({
        comment: { $in : commentIds},
        likedBy: req.user?._id
    }).select("comment")
    

    const result = {}

    commentIds.forEach( id => {
        result[id] = {
            likeCount: 0,
            liked: false
        }
    })

    userLikes.forEach( like => {
        result[like.comment].liked = true;
    })
    

    likes.forEach(like => {
        result[like._id].likeCount = like.likeCount;
    })


    return res.status(200)
    .json(new ApiResponse(200 , result , "Total likes for the video"))

    
})


export { 
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos,
    getTotalVideoLikes,
    getTotalCommentLikes,
    getTotalTweetLikes,
    getLikedComments
}