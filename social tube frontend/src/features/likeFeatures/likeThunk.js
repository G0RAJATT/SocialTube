import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Components/utils/Api";


// --- Toggle video like --- //
export const toggleVideoLike = createAsyncThunk("likes/toggleVideoLike",
    async ({videoId}, thunkAPI) => {

        try {

            const res = await api.post(`/likes/video/${videoId}`, {})          
            return res.data;


        } catch (error) {

            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred while toggling the like.");
        }
    }
)

//  -- toggele comment like --- //
export const toggleCommentLike = createAsyncThunk("likes/toggleCommentLike",
    async (commentId, thunkAPI) => {

        try {

            const res = await api.post(`/likes/comment/${commentId}`, {})
            return res.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred while toggling the like.");
        }
    })

// -- toggle tweet like --- //
export const toggleTweetLike = createAsyncThunk("likes/toggleTweetLike",
    async ({tweetId}, thunkAPI) => {
        try {
            const res = await api.post(`/likes/tweet/${tweetId}`, {})
            return res.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred while toggling the like.");
        }
    })

// --- get Total video likes --- //
export const getTotalVideoLikes = createAsyncThunk("likes/getTotalVideoLikes",
    async (videoId, thunkAPI) => {

        try {

            const res = await api.get(`/likes/video-likes/${videoId}`, {})
            return res.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred while getting like count.");
        }
    })

//-- get total comment likes --- //
export const getTotalCommentLikes = createAsyncThunk("likes/getTotalCommentLikes",
    async (videoId, thunkAPI) => {
        try {
            const res = await api.get(`/likes/liked-comments/${videoId}`, {})
            console.log("videoId" ,videoId);
            
            return res.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred while getting like count.");
        }
    })

// -- get total tweet likes --- //
export const getTotalTweetLikes = createAsyncThunk("likes/getTotalTweetLikes",
    async (tweetId, thunkAPI) => {
        try {
            const res = await api.get(`/likes/tweet-likes/${tweetId}`, {})
            console.log("like:" , res.data);
            return res.data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred while getting like count.");
        }
    })    