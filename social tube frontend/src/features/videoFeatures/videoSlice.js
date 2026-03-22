import { createSlice } from "@reduxjs/toolkit";
import { getAllVideos, getAVideo, increaseViewCount, publishVideo, updateVideo } from "./videoThunks";


const initialState = {
    AllVideos:[],
    videoObj:null,
    history:null,
    loading: false,
    error: null,
    lastAction: null,
    openMenuVideoId:null

}

const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers:{

        // -- toggle video show menu  -- //

        openVideoMenu: (state , action) => {

            state.openMenuVideoId = action.payload;
        },

        closeVideoMenu: (state) => {

            state.openMenuVideoId = null;
        }

    },

    extraReducers: (builder) => {

        builder

        // --- Publish a video --- //

        .addCase(publishVideo.pending , (state) => {

            state.loading = true;
            state.error = null;
           
        })

        .addCase(publishVideo.fulfilled , (state , action) => {

            state.loading = false;
            state.error = null;
            state.videoObj = action.payload.data;
            state.lastAction = "publishVideo";
        })

        .addCase(publishVideo.rejected , (state ,action) => {

            state.loading = false;  
            state.error = action.payload || "An error occurred while publishing the video.";
            state.lastAction = "publishVideo";
        })

        // --- Update a video --- //

        .addCase(updateVideo.pending , (state) => {

            state.loading = true;
            state.error = null;
       
        })

        .addCase(updateVideo.fulfilled , (state , action) => {

            state.loading = false;
            state.error = null;
            state.videoObj = action.payload.data;
            state.lastAction = "updateVideo";

        })

        .addCase(updateVideo.rejected , (state , action) => {

            state.loading = false;
            state.error = action.payload || "An error occurred while updating the video.";
            state.lastAction = "updateVideo";
        })

        // --- Get A video --- //

        .addCase(getAVideo.pending , (state) => {

            state.loading = true;
            state.error = null;
           
        })

        .addCase(getAVideo.fulfilled , (state , action) => {

            state.loading = false;
            state.error = null;
            state.videoObj = action.payload.data;
            state.lastAction = "getAVideo";
        })

        .addCase(getAVideo.rejected , (state , action) => {

            state.loading = false;
            state.error = action.payload || "An error occurred while fetching A video.";
            state.lastAction = "getAVideo";
        })

        // --- Get All Videos --- //

        .addCase(getAllVideos.pending , (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(getAllVideos.fulfilled , (state , action) => {

            state.loading = false;
            state.error = null;
            state.AllVideos = action.payload.data;
            state.lastAction = 'getAllVideos'

            
        })

        .addCase(getAllVideos.rejected , (state , action) => {

            state.loading = false;
            state.error = action.payload.data || "something went wrong while fetching all videos"
            state.lastAction = "getAllVideos"
        })

        // --- increase View Count --- //

        .addCase(increaseViewCount.pending , (state) => {
            state.error = null;
        })

        .addCase(increaseViewCount.fulfilled , (state , action) => {
            state.error = null;
            const video = state.AllVideos.find((v) => v._id === action.payload.data._id);
            if(video){
                video.view = action.payload.data.view;
            }

            state.lastAction = "increaseViewCount";
        })

        .addCase(increaseViewCount.rejected , (state , action) => {
            state.error = action.payload.data || "An error occurred while increasing the view count.";
            state.lastAction = "increaseViewCount";
        })

    }
})

export default videoSlice.reducer;

export const { toggleVideoMenu , openVideoMenu , closeVideoMenu} = videoSlice.actions;