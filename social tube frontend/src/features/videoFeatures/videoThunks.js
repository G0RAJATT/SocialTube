import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Components/utils/Api.js";

// --- Publish a video --- //

export const publishVideo = createAsyncThunk("videos/publishAVideo",
    async (formData, thunkAPI) => {

        try {
            const res = await api.post("/videos", formData)
            return res.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred while publishing the video.");
        }
    }
)

// --- Update a video --- //

export const updateVideo = createAsyncThunk("videos/updateVideo" , 
    async ({videoId , formData} , thunkAPI) => {

        try {

             const res = await api.patch(`/videos/${videoId}`, formData)
             return res.data;
            
        } catch (error) {
            
            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred while updating the video.");
        }
    }
)

// -- Get A Video -- //

export const getAVideo = createAsyncThunk("videos/getVideo" ,
    async (videoId , thunkAPI) => {

        try {
            
            const res = await api.get(`/videos/${videoId}`)                    
            return res.data;

        } catch (error) {
            
            return thunkAPI.rejectWithValue(error.response?.data || "An error occured when fetching a video");
        }
    }
)

// -- Get All Videos -- // 

export const getAllVideos = createAsyncThunk("videos/getAllVideos" ,
    async (Empty , thunkAPI) => {

        try {
            
            const res = await api.get(`/videos/`)          
            return res.data;

        } catch (error) {
            
            return thunkAPI.rejectWithValue(error.response?.data || "An error occured when fetching all videos");
        }
    }
)
 
// --- Increase View Count --- //

export const increaseViewCount = createAsyncThunk("videos/increaseViewCount" ,
    async (videoId , thunkAPI) => {

        try {

            const res = await api.patch(`/videos/increase-view/${videoId}` ,{})
            return res.data;

        } catch (error) {
            
            return thunkAPI.rejectWithValue(error.response?.data || "An error occured when increasing view count");
        }
    }
)