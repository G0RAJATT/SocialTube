import { createSlice } from "@reduxjs/toolkit";
import { CreateTweet, getAllTweets, updateTweet } from "./tweetThunks";


const initialState = {
    AllTweets: [],
    tweetObj:null,
    loading: false,
    error: null,
    lastAction: null
}

const tweetSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {

    },

    extraReducers:(builder) => {

        builder

        // --- Create Tweet --- //

        .addCase(CreateTweet.pending , (state) => {

            state.loading = true;
            state.error = null;
            state.lastAction = null;
        })

        .addCase(CreateTweet.fulfilled , (state , action) => {

            state.loading = false;
            state.error = null;
            state.tweetObj = action.payload.data;
            state.AllTweets = [...state.AllTweets, action.payload.data];
            state.lastAction = "Create Tweet";
        })

        .addCase(CreateTweet.rejected , (state , action) => {

            state.loading = false;
            state.error= action.payload.data;
            state.lastAction = "Create Tweet";
        })

        // --- UPDATE TWEET --- //

        .addCase(updateTweet.pending , (state) => {

            state.loading = true;
            state.error = null;
            state.lastAction = null;

        })

        .addCase(updateTweet.fulfilled , (state , action) => {

            state.loading = false;
            state.error = null;
            state.tweetObj = action.payload.data;
            state.lastAction = "Update Tweet";
        })

        .addCase(updateTweet.rejected , (state , action) => {

            state.loading = false,
            state.error = action.payload.data;
            state.lastAction = "update Tweet";
            
        })

        // --- get All Tweets ----//

        .addCase(getAllTweets.pending , (state) => {

            state.loading = true;
            state.error = null;
        })

        .addCase(getAllTweets.fulfilled , (state , action) => {

            state.loading = false;
            state.error = null;
            state.AllTweets = action.payload.data;
            state.lastAction = "get All Tweets";
        })

        .addCase(getAllTweets.rejected , (state , action) => {

            state.loading = false;
            state.error = action.payload.data;
            state.lastAction = "get All Tweets";    
        })
    }
})

export default tweetSlice.reducer 
