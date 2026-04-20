import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Components/utils/Api";


export const isUserSubscribed = createAsyncThunk(
    "subscriptions/isUserSubscribed",
    async ({userId , channelId} , thunkAPI) => {

        try {

             console.log("Subthunk:" , userId , channelId);

            const res = await api.get(`/subscriptions/isSubscribed/${channelId}/${userId}`);
            console.log("Subthunk:" , res.data);
            
            return res.data;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while checking subscription status")
        }

    })