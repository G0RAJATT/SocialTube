import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Components/utils/Api.js";

// --- create Tweet --- //

export const CreateTweet = createAsyncThunk("tweets/postTweet" ,
    async (formData , thunkAPI) => {

        try {

            const res = await api.post("/tweets/tweet" , formData)
            return res.data;
            
        } catch (error) {
            
            return thunkAPI.rejectWithValue(error.response?.data || "Somethingwent wrong while posting tweet.")
        }
    }
)

// --- Update Tweet --- //

export const updateTweet =  createAsyncThunk("tweets/updateTweet" ,
    async({tweetId , formData} , thunkAPI) => {

        try {

            const res = await api.post(`/tweets/tweet/${tweetId}` , formData)
            return res.data;
            
        } catch (error) {
         return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while updating Tweet")   
        }
    }
)


//  ---- get All Tweets --- //

export const getAllTweets = createAsyncThunk("tweets/getAllTweets" ,
    async ({Empty} , thunkAPI) => {
        
        try {

            const res = await api.get("/tweets/all-tweets");
            return res.data;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while fetching all tweets."); 
        }

    })