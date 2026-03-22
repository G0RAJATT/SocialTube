import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Video from "../models/video.model.js";
import User from "../models/user.model.js";


const getAllVideos = asyncHandler(async (req,res) =>{

    const videos = await Video.find({}).populate("owner", "fullName username avatar").sort({ createdAt: -1 }).lean();

    if(!videos){
        throw new ApiError(500, "Something went wrong while fetching videos")
    }

    if(videos == ""){
        res.status(200).json(new ApiResponse(200 , "" , "There is no video"))
    }

    

    res.status(200)
    .json(new ApiResponse(200 , videos , "All Videos fethed Successfully"))

})

const publishAVideo = asyncHandler(async (req, res) => {

    //get description,title,thumbnail and video

    const { title, description } = req.body;

    //check data (empty fields)

    if (!(title || description)) {
        throw new ApiError(400, "All data fields are required")
    }

    //get local filepath of video and thumbnail

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path
    const videoLocalPath = req.files?.video[0]?.path

    // check if thumbnailpath ot videoPath are empty or null

    if (!videoLocalPath || videoLocalPath == ("" || undefined)) {
        throw new ApiError(400, "video is required")
    }

    if (!thumbnailLocalPath || thumbnailLocalPath == ("" || undefined)) {
        thumbnailLocalPath = ""
    }

    // upload both on cloudinary (using async function)

    const thumbnailResponse = await uploadOnCloudinary(thumbnailLocalPath);
    const videoResponse = await uploadOnCloudinary(videoLocalPath);

    // check data upload correctly

    if (!videoResponse || videoResponse == ("" || undefined)) {
        throw new ApiError(500, "Something went wrong while uploading video")
    }

    // get duration from cloudinary response

    console.log("\n-------video response-------\n", videoResponse);


    console.log("\n\n-------video duration-------\n", videoResponse.duration);


    // create video object and sent it as response.




    const video = await Video.create({

        videoFile: videoResponse.url,
        thumbnail: thumbnailResponse?.url || "",
        title,
        description,
        duration: videoResponse.duration || "", // get from videoResponse
        isPublished: true,
        owner: req.user._id

    })

    if (!video) {
        throw new ApiError(500, "Something went wrong while publishing video")
    }

    // send response using api response

    return res.status(200)
        .json(new ApiResponse(200, video, "video published successfully"))
})

const getVideoById = asyncHandler(async (req, res) => {

    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "VideoId is needed to fetch video")
    }

    try {
        const video = await Video.findById(videoId).populate("owner", "fullName username avatar").lean();

        if (!video) {
            throw new ApiError(400, "Video not exist")
        }


        if(req?.user){

        console.log("User logged In: " , req?.user);
            

        await User.findByIdAndUpdate( req?.user?._id ,
        {
            $pull: { watchHistory: videoId}
        }
       )

        await User.findByIdAndUpdate( req?.user?._id ,
        {
            $push: { watchHistory: {
                $each: [videoId],
                $position:0,
                $slice:50
            }},

            
        },
        {
            new:true
        }
       )

    }
       

        

        return res.status(200)
            .json(new ApiResponse(200, video, "Video fetched successsfully"))

    } catch (error) {

        console.log("\n----viedo fetching while wrong input-----\n")
        throw new ApiError(401, "Invalid videoId" || error.message)
    }


})

const updateVideo = asyncHandler(async (req, res) => {

    //get videoId
    const { videoId } = req.params


    //check videoId
    if (!videoId) {
        throw new ApiError(401, "VideoId is necessary")
    }
    try {
        //get title and description
        const { title, description } = req.body

        //check data
        if (!(title || description)) {
            throw new ApiError(400, "Title and Description is required")
        }

        //get thumbnail
        const thumbnailLocalPath = req.file?.path

        console.log("\n----thumbnailLocalPath-----\n",thumbnailLocalPath);
        

        //check thumbnail ,  thumbnail is not necessary|| is not sent , set empty ""
        if (!thumbnailLocalPath) {
            thumbnailLocalPath == ""
        }

        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

        if (!thumbnail || thumbnail == "") {
            thumbnail == ""
        }

        const updatedVideoData = await Video.findByIdAndUpdate(videoId,
            {
                $set: {
                    title,
                    description,
                    thumbnail: thumbnail?.url || ""
                }
            },
            {
                new: true
            }
        ).populate("owner", "fullName username avatar")

        return res.status(200)
            .json(new ApiResponse(200, updatedVideoData, "Video datails updated"))

    } catch (error) {

        throw new ApiError(401, "Invalid videoId") || error.message
    }


})

const toggelPublishStatus = asyncHandler(async (req, res) => {

    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(401, "VideoId is necessary")
    }

    try {
        const video = await Video.findById(videoId)

        video.isPublished = !video.isPublished;
        await video.save({ validateBeforeSave:false})

        return res.status(200)
            .json(new ApiResponse(200, video, "Video publish status is toggeled"))

    } catch (error) {
        throw new ApiError(401, error.message)
    }
})

const deleteVideo = asyncHandler(async (req,res) =>{

     const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(401, "VideoId is necessary")
    }

    // Also Delete video andthumbnail from cloudinary side

    await Video.findByIdAndDelete( videoId)

    res.status(201)
    .json(new ApiResponse(201 , videoId , "Video deleted successfully"))
    
})

const getOwner = asyncHandler(async (req, res) => {

    const {videoId} = req.params

    const video = await Video.findById(videoId).populate("owner", "fullName username avatar").lean()

   

    console.log("\n------video------\n" , video)



    res.status(200)
        .json(new ApiResponse(200, video, "fetch"))
})

const increaseViewCount = asyncHandler(async (req , res) => {

     const {videoId} = req.params;

     const video = await Video.findByIdAndUpdate(videoId ,
        {
            $inc: { view: 1 },  
        },
        {
            new: true
        }
     )

     res.status(200)
     .json(new ApiResponse(200 , video , "View count increased"))



})


export {
    publishAVideo,
    getVideoById,
    updateVideo,
    toggelPublishStatus,
    deleteVideo,
    getAllVideos,
    getOwner,
    increaseViewCount
}