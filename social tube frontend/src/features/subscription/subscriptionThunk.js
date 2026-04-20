import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Components/utils/Api";


export const isUserSubscribed = createAsyncThunk(
    "subscriptions/isUserSubscribed",
    async ({ userId, channelId }, thunkAPI) => {

        try {

            const res = await api.get(`/subscriptions/isSubscribed/${channelId}/${userId}`);

            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while checking subscription status")
        }

    })

// --- toggle subscription --- //

export const toggleSubscription = createAsyncThunk("users/toggleSubscription",
    async (channelId, thunkAPI) => {

        try {

            const res = await api.post(`/subscriptions/subscribe/${channelId}`)
            return res.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while fetching user details")
        }
    }
)