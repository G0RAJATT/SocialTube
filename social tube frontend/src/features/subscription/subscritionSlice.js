import { createSlice } from "@reduxjs/toolkit";
import { isUserSubscribed } from "./subscriptionThunk";



const inititalState = {
    subscription: null,
    loading: false,
    error: null,
}

const subscriptionSlice = createSlice({
    name: "subscriptions",
    initialState: inititalState,
    reducers: {
    },

    extraReucers: (builder) => {

        builder

        // ---- Check Subscription Status ---- //

        .addCase(isUserSubscribed.pending , (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(isUserSubscribed.fulfilled , (state , action) => {
            state.loading = false;
            state.error = null;
            state.subscription = action.payload.data;
            console.log("subscription" , state.subscription);
            
        })

        .addCase(isUserSubscribed.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload.data || "Failed to check subscription status";
        })

    }
})

export default subscriptionSlice.reducer;