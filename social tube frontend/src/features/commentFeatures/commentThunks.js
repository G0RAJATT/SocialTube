import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Components/utils/Api";



//  --- Add Comment --- //


export const addComment = createAsyncThunk("comments/addComment" ,
    async ({videoId , content} , thunkAPI) => {

        try {

            const res = await api.post(`comments/${videoId}` , content)
            return res.data;
            
        } catch (error) {
            
            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred while adding the comment.");
        }
    }
)


// ---  Get Video Comments --- //

export const getVideoComments = createAsyncThunk("comments/getVideoComments" ,
    async (videoId , thunkAPI) => {
        try {
            const res = await api.get(`comments/${videoId}`)
            return res.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.response?.data || "An error occurred while fetching video comments.");
        
        }
    })