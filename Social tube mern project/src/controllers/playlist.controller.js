import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Playlist from "../models/playlist.model.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";


const createPlaylist = asyncHandler(async (req, res) => {

    const { name, description } = req.body;

    if (!(name || description)) {
        throw new ApiError(400, " All fields are mandatory")
    }

    // const owner = await Playlist.aggregate([
    //     {
    //         $match:{
    //             _id: new mongoose.Types.ObjectId(req.user?._id)
    //         }
    //     },
    //     {
    //         $lookup:{
    //             from:"users",
    //             localField:"owner",
    //             foreignField:"_id",
    //             as:"owner",
    //             pipeline:[
    //                 {
    //                     $project:{
    //                         fullName: 1,
    //                         username: 1,
    //                         avatar: 1
    //                     }
    //                 }
    //             ]
    //         }
    //     },
    //     {
    //         $addFields:{
    //             owner:{
    //                 $first:"$owner"
    //             }
    //         }
    //     }
    // ])

    // if(!owner){
    //     throw new ApiError(500 , "Something went wrong while getting owner data")
    // }

    // console.log("\n------owner-------\n",owner);


    const playlist = await Playlist.create({

        name,
        description,
        owner: req.user?._id,
    })

    if (!playlist) {
        throw new ApiError(500, "Something went wrong while creating playlist")
    }

    console.log("\n------playlist-------", playlist);

    return res.status(200)
        .json(new ApiResponse(200, playlist, "Playlist created "))

})

const getUserPlaylists = asyncHandler(async (req, res) => {

    const  { username } = req.params

    console.log("username" , username);
    

    if (!username || username.trim() == "") {
        throw new ApiError(401, "Invalid username")

    }

    const userId = await User.findOne({username}).select("_id")

     if (!userId) {
        throw new ApiError(404, "User not found")
    }


    

    const playlists = await Playlist.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
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
            $lookup:{
                from:"videos",
                localField:"videos",
                foreignField:"_id",
                as:"playlistPoster",
                pipeline:[
                    {
                        $project:{
                            thumbnail: 1
                        }
                    }
                ]
            }

        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                },
               
            }
        }
    ])

    if (!playlists) {
        throw new ApiError(500, "Something went wrong while fetching playlists")
    }

    console.log("\n------User playlists-------\n",playlists)

    return res.status(200)
        .json(new ApiResponse(200, playlists, "User playlists fetched successfully"))
})

const getPlaylistById = asyncHandler(async (req, res) => {

    const { playlistId } = req.params

    if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(401, "Invalid Playlist Id")
    }

    const playlist = await Playlist.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(playlistId)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "videos",
                foreignField: "_id",
                as: "videos",
                pipeline: [
                    {

                        $lookup:{
                            from:"users",
                            localField:"owner",
                            foreignField:"_id",
                            as:"owner",
                            pipeline:[{
                                $project:{
                                    fullName: 1,
                                    username: 1,
                                    avatar: 1
                                }
                            }]
                        }

                    },
                    {
                        $addFields:{
                            owner:{
                                $first:"$owner"
                            }
                        }

                    },
                    {
                        $project: {
                            videoFile: 1,
                            thumbnail: 1,
                            title: 1, 
                            description: 1,
                            duration: 1,
                            owner: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                videos: "$videos"
            }
        }
    ])

    if (!playlist) {
        throw new ApiError(500, "Something went wrong while fetching playlist")
    }


    return res.status(200)
        .json(new ApiResponse(200, playlist, "User playlist fetched successfully"))


})

const addVideoToPlaylist = asyncHandler(async (req, res) => {

    const { playlistId, videoId } = req.params

    if ([playlistId, videoId].some((field) => mongoose.isValidObjectId(field) == false)) {
        throw new ApiError(401, `Invalid Playlist or Video Id`)
    }

    const addedVideo = await Playlist.findByIdAndUpdate(playlistId,
        {
            $addToSet: { videos: videoId }
        },
        {
            new: true
        }
    )



    if (!addedVideo) {
        throw new ApiError(500, "Something went wrong while adding video")
    }

    console.log("\n-----added video-------\n", addedVideo)

    return res.status(200)
        .json(new ApiResponse(200, addedVideo, "Video added to Playlist"))


})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
   
    if ([playlistId, videoId].some((field) => mongoose.isValidObjectId(field) == false)) {
        throw new ApiError(401, `Invalid Playlist or Video Id`)
    }

    const removeVideo = await Playlist.findByIdAndUpdate(playlistId,
        {
            $pull: { videos: videoId }
        },
        {
            new: true
        }
    )



    if (!removeVideo) {
        throw new ApiError(500, "Something went wrong while removing video")
    }

    console.log("\n-----playlist after video remove-------\n", removeVideo)

    return res.status(200)
        .json(new ApiResponse(200, removeVideo, "Video removed from Playlist"))

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
   
    if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(401, "Invalid Playlist Id")
    }
    
    const Removedplaylist = await Playlist.findByIdAndDelete(playlistId)


    if(!Removedplaylist){
        throw new ApiError(500 , "Something went wrong while Removing Playlist")
    }

     return res.status(200)
        .json(new ApiResponse(200, Removedplaylist, "Playlist removed"))

})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params

      if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(401, "Invalid Playlist Id")
    }

    const {name, description} = req.body

     if ([name , description].some((field) => field?.trim() == "")) {
        throw new ApiError(401, "Empty fields")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId,
        {
            $set:{
                name,
                description
            }
        },
        {
            new:true
        }
    )

    if(!updatedPlaylist){
        throw new ApiError(500 , "Something went wrong while updating playlist")
    }
   

    return res.status(200)
    .json(new ApiResponse(200 , updatedPlaylist , "Playlist updated successfully"))

})


export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist

}



