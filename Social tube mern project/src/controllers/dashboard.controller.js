import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Video from "../models/video.model.js";


const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

    const { username } = req.params

    if (!username?.trim()) {
        throw new ApiError(400, "username is missing")
    }

    const channel = await User.aggregate([

        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "_id",
                foreignField: "owner",
                as: "channelVideos",

            }
        },
        {
            $addFields: {
                channelVideosIds: {
                    $map: {
                        input: "$channelVideos",
                        as: "video",
                        in: "$$video._id"
                    }
                }
            }
        },
        {
            $lookup: {
                from: "likes",
                let: { videoIds: "$channelVideosIds" },
                pipeline: [{
                    $match: {
                        $expr: {
                            $in: ["$video", "$$videoIds"]
                        }
                    }
                }],
                as: "videoLikes"
            }
        },
        {
            $addFields: {

                totalVideoLikes: {
                    $size: "$videoLikes"
                },

                channelVideosCount: {
                    $size: "$channelVideos"
                },

                subscribersCount: {
                    $size: "$subscribers"
                },

                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },

                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            }
        },

        {
            $project: {
                fullName: 1,
                username: 1,
                email: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                channelVideosCount: 1,
                totalVideoLikes: 1

            }
        }
    ])

    if (!channel) {
        throw new ApiError(500, "something went wrong while fetching channel stats")
    }

    return res.status(200)
        .json(new ApiResponse(200, channel, "channel statsfetched successfully"))

})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel


    const channelVideos = await Video.find({owner : req.user?._id}).lean()
        
       

    if (!channelVideos) {
        throw new ApiError(500, "something went wrong while fetching channel videos")
    }

    return res.status(200)
        .json(new ApiResponse(200, channelVideos, "channel videos fetched successfully"))
})

export {
    getChannelStats,
    getChannelVideos
}