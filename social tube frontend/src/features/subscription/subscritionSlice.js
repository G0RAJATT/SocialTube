import { createSlice } from "@reduxjs/toolkit";
import { isUserSubscribed, toggleSubscription } from "./subscriptionThunk";



const initialState = {
    subscription: null,
    loading: false,
    error: null,
}

const subscriptionSlice = createSlice({
    name: "subscriptions",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {

        builder

        // ---- Check Subscription Status ---- //

        .addCase(isUserSubscribed.pending , (state) => {
            state.loading = true;
            state.error = null;
            console.log("In loading state");
            
        })

        .addCase(isUserSubscribed.fulfilled , (state , action) => {
            state.loading = false;
            state.error = null;
            state.subscription = action.payload.data;
        })

        .addCase(isUserSubscribed.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload.data || "Failed to check subscription status";
        })

        // ---- Toggle Subscription ---- //

        .addCase(toggleSubscription.pending , (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(toggleSubscription.fulfilled , (state , action) => {
            state.loading = false;
            state.error = null;
            state.subscription = action.payload.data;  // Assuming the API returns the updated subscription status
        })

        .addCase(toggleSubscription.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload.data || "Failed to toggle subscription status";
        })
    }
})

export default subscriptionSlice.reducer;