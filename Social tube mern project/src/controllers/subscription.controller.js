import Subscription from "../models/subscription.model.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleSubscription = asyncHandler(async (req, res) => {

    const { channelId } = req.params
    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(401, "Invalid video ID")
    }

    try {
 
        const subscribed = await Subscription.create({
            channel: channelId,
            subscriber: req.user?._id
        })

        console.log(subscribed);

        return res.status(200)
            .json(new ApiResponse(200,{subscribed  , "isSubscribed": true} , "channel is subscribed by user"))

    } catch (error) {

        if (error.code != 11000) {
            throw new ApiError(500, "something went wrong while subscribing to channel")
        }

        const unsubscribe = await Subscription.deleteOne({ channel: channelId, subscriber: req.user?._id })

        if (!unsubscribe) {
            throw new ApiError(500, "Something went wrong while unsubscribing to channel")
        }

        return res.status(200)
            .json(new ApiResponse(200, { "subscribed": false }, "channel is subscribed by user"))

    }
})


const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(401, "Invalid video ID")
    }

    const subscribers = await Subscription.aggregate([
        {
            $match:{
                channel: new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"subscriber",
                foreignField:"_id",
                as:"subscriber",
                pipeline:[{
                    $project:{
                        username:1,
                        fullName:1,
                        email:1,
                        avatar:1
                    }
                }]
            }
        },
        {
            $addFields:{
                subscriber:{
                    $first: "$subscriber"
                }
            }
        }
    ])

    if(!subscribers){
        throw new ApiError(500 , "Something went wrong while fetching subscribers or there is no subscriber")
    }
    return res.status(200)
        .json(new ApiResponse(200, subscribers, "channel is subscribed by user"))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

     if (!mongoose.isValidObjectId(subscriberId)) {
        throw new ApiError(401, "Invalid video ID")
    }

    const subscribedChannels = await Subscription.aggregate([
        {
            $match:{
                subscriber: new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"channel",
                foreignField:"_id",
                as:"channel",
                pipeline:[{
                    $project:{
                        username:1,
                        fullName:1,
                        avatar:1
                    }
                }]
            }
        },
        {
            $addFields:{
                channel:{
                    $first: "$channel"
                }
            }
        }
    ])

    if(!subscribedChannels){
        throw new ApiError(500 , "Something went wrong while fetching channel user subscribed to or there is no subscribed channel")
    }
    return res.status(200)
        .json(new ApiResponse(200, subscribedChannels, "channels subscribed by user"))

})



export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}