import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import Video from "../models/video.model.js";
import ms from "ms";

// access and refresh token genrator method
const generateAccessAndRefreshTokens = async (userId) => {

    try {

        const user = await User.findById(userId)

        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }

    } catch (error) {

        throw new ApiError(500, "Something went wrong while genrating Refresh and Access Token")
    }
}

// options method for secure cookies
const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None"
}

// user controllers

const registerUser = asyncHandler(async (req, res) => {

    // get usere details from user
    // validation check -not empty'

    const { username, email, password, fullName, } = req.body

    console.log(username, email);

    if (
        [fullName, username, email, password].some((field) => field?.trim() == "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exist - username,email

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with same email and username exist")
    }


    // check for images and avatar 

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    console.log(avatarLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is required")
    }

    // upload them to cloudinary - check avatar

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar filed is required")
    }
    // create user object - create entry in db

    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password
    })

    if (!user) {
        throw new ApiError(500, "User not created---")
    }

    // remove password and refresh token field from response

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


    // check for user creation

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    console.log("\n-----created user-----\n", createdUser);

    // return response

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

    //  res.end();

})

const loginUser = asyncHandler(async (req, res) => {

    //get user data => email , username , password

    const { email, username, password } = req.body;

    // check user exist by email or username

    if (!(email || username)) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({ $or: [{ email }, { username }] })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }


    // check password
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    // generate acces and refesh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findOne(user._id).select("-password -refreshToken");
    // after send token (Access and refresh) with cookies 

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    }

    return res.status(200)
        .cookie("accessToken", accessToken, { ...options,
                 maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY) })
            .cookie("refreshToken", refreshToken, {...options ,
                 maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY)})   
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken

                },
                "User logged in Successfully"
            )

        )
})

const logoutUser = asyncHandler(async (req, res) => {

    const userId = req.user._id

    await User.findByIdAndUpdate(
        userId,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )



    return res.status(200)
         .cookie("accessToken", accessToken, { ...options,
                 maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY) })
            .cookie("refreshToken", newRefreshToken, {...options ,
                 maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY)})   
        .json(new ApiResponse(200, {}, "User logges out"))

})

const refreshAccessToken = asyncHandler(async (req, res) => {

    const upComingToken = req.cookie.refreshToken;

    if (!upComingToken) {

        throw new ApiError(401, "unauthorized request, Refresh Token required")
    }

    try {
        const decodedRefreeshToken = jwt.verify(upComingToken, process.env.REFRESH_TOKEN_SECRET);

        // if (!decodedRefreeshToken) {
        //     throw new ApiError(400, "Invalid Refresh Token")
        // }

        const user = await User.findById(decodedRefreeshToken._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (decodedRefreeshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refesh token is expired or used")
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

        console.log("ACCESS:", process.env.ACCESS_TOKEN_EXPIRY);

        return res.status(200)
        .cookie("accessToken", accessToken, { ...options,
                 maxAge: ms(process.env.ACCESS_TOKEN_EXPIRY) })
            .cookie("refreshToken", newRefreshToken, {...options ,
                 maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY)})       
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access Token is refreshed"
                )
            )
    } catch (error) {

        throw new ApiError(401, error?.message || "Invalid refresh Token")

    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    if (!(oldPassword && newPassword)) {
        throw new ApiError(400, "Old Password and New Password is required")
    }

    const isPassword = await user.isPasswordCorrect(oldPassword);

    if (!isPassword) {
        throw new ApiError(401, "Incorrect Password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false })

    // await User.findByIdAndUpdate(
    //     user._id ,
    //     {
    //         $set:{
    //             password : newPassword
    //         }
    //     },
    //     {
    //         new: true
    //     }
    // )

    return res.status(200)
        .json(new ApiResponse(200, { oldPassword, newPassword }, "User password is updated"))



})

const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200)
        .json(new ApiResponse(200, req.user, "Current user fetched successfully"))
})

const updateAccountDetails = asyncHandler(async (req, res) => {

    const { fullName, email } = req.body;

    if (!(fullName && email)) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,

        {
            $set: {
                fullName,
                email
            }
        },
        {
            new: true
        }

    ).select("-password")

    console.log("---user---\n", user);



    return res.status(200).
        json(new ApiResponse(200, user, "user data updated"))
})

const updateUserAvatar = asyncHandler(async (req, res) => {

    const newavatarPath = req.file?.path;

    if (!newavatarPath) {
        throw new ApiError(400, "Avatar field is required")
    }

    const avatar = await uploadOnCloudinary(newavatarPath)

    if (!avatar) {
        throw new ApiError(400, " errror while uploading Avatar file")
    }

    const user = await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    // const user = await User.findById(req?.user);
    // user.avatar = avatar.url;
    // user.save({ validateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200, user, "Avatar is updated"))

})

const updateUserCoverImage = asyncHandler(async (req, res) => {

    const newCoverImagePath = req.file?.path;

    if (!newCoverImagePath) {
        throw new ApiError(400, "CoverImage field is required")
    }

    const coverImage = await uploadOnCloudinary(newCoverImagePath)

    if (!coverImage) {
        throw new ApiError(400, " errror while uploading CoverImage file")
    }

    const user = await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    // const user = await User.findById(req?.user);
    // user.coverImage = coverImage.url;
    // user.save({ validateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200, user, "coverImage is updated"))

})

const getUserChannelProfile = asyncHandler(async (req, res) => {

    const { userId } = req?.params


    if (!userId) {
        throw new ApiError(400, "userId is missing")
    }

    const channelVideos = await Video.find({ owner: userId })
    .populate("owner", "fullName username avatar")
    .sort({ createdAt: -1 })
    .lean()



    const channelProfile = await User.aggregate([

        {
            $match: {
                username: await channelVideos[0]?.owner?.username?.toLowerCase()
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
            $addFields: {
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

            }
        }
    ])

    if (!channelProfile?.length) {
        throw new ApiError(500, "Something went wrong while sending channel details")
    }

    console.log("\n----------channel aggerigate---------\n", channelProfile)

    const channel = { ...channelProfile[0], videos: channelVideos }

    return res.status(200)
        .json(
            new ApiResponse(200, channel, "User channel fetched successfully")
        )

})

const getWatchHistory = asyncHandler(async (req, res) => {

    // const user = await User.aggregate([
    //     {
    //         $match: {
    //             _id: new mongoose.Types.ObjectId(req.user?._id)
    //         }
    //     },
    //     {
    //         $project: {
    //             password: 0,
    //             refreshToken: 0
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "videos",
    //             localField: "watchHistory",
    //             foreignField: "_id",
    //             as: "watchHistory",
    //             pipeline: [
    //                 {
    //                     $lookup: {
    //                         from: "users",
    //                         localField: "owner",
    //                         foreignField: "_id",
    //                         as: "owner",
    //                         pipeline: [
    //                             {
    //                                 $project: {
    //                                     fullName: 1,
    //                                     username: 1,
    //                                     avatar: 1

    //                                 }
    //                             }
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     $addFields: {
    //                         owner: {
    //                             $first: "$owner"
    //                         }
    //                     }
    //                 }
    //             ]
    //         }
    //     },
    // ])

    const user = await User.findById(req.user?._id)
    .populate({
        path:"watchHistory",
        options: {lean : true},
        populate:{
            path:"owner",
            select:"fullName username avatar"  
        }
    })
    .lean()




    if (!user) {
        throw new ApiError(500, "Something went wrong while sending watch History details")
    }

    // console.log("\n----------user aggerigate---------\n", user);

    return res.status(200)
        .json(
            new ApiResponse(200, user, "Users watch History fetched successfully")
        )
})




export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
};
