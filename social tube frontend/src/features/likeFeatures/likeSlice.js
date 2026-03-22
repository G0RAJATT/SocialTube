import { createSlice } from "@reduxjs/toolkit"
import {
    getTotalCommentLikes,
    getTotalTweetLikes,
    getTotalVideoLikes,
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike
} from "./likeThunk";


const initialState = {
    like: null,
    likedVideos: [],
    loading: false,
    error: null,
    lastAction: null,
    commentLike: null,
    tweetLike: null
}

const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {

        builder

            // --- Toggle video like --- //

            .addCase(toggleVideoLike.pending, (state) => {
                state.error = null;
            })

            .addCase(toggleVideoLike.fulfilled, (state, action) => {
                state.error = null;
                state.like = action.payload.data;
                state.lastAction = "toggleVideoLike";
            })

            .addCase(toggleVideoLike.rejected, (state, action) => {
                state.error = action.payload.data || "An error occurred while toggling the like.";
                state.lastAction = "toggleVideoLike";
            })

            // -- Toggle comment like --- //

            .addCase(toggleCommentLike.pending, (state) => {
                state.error = null;
            })

            .addCase(toggleCommentLike.fulfilled, (state, action) => {
                state.error = null;

                const id = action.payload.data.commentLiked.comment;

                if (id) {
                    state.commentLike[id].likeCount = action.payload.data.likeCount;
                    state.commentLike[id].liked = action.payload.data.liked;
                }

                state.lastAction = "toggleCommentLike";
            })

            .addCase(toggleCommentLike.rejected, (state, action) => {
                state.error = action.payload.data || "An error occurred while toggling the like.";
                state.lastAction = "toggleCommentLike";
            })

            //-- toggle tweet like --- //

            .addCase(toggleTweetLike.pending, (state) => {
                state.error = null;
            })

            .addCase(toggleTweetLike.fulfilled, (state, action) => {
                state.error = null;
                state.tweetLike = action.payload.data;
                state.lastAction = "toggleTweetLike";
            })

            .addCase(toggleTweetLike.rejected, (state, action) => {
                state.error = action.payload.data || "An error occurred while toggling the like.";
                state.lastAction = "toggleTweetLike";
            })

            // --- get Total video likes --- //

            .addCase(getTotalVideoLikes.pending, (state) => {
                state.error = null;
            })

            .addCase(getTotalVideoLikes.fulfilled, (state, action) => {
                state.error = null;
                state.like = action.payload.data;
                state.lastAction = "getTotalVideoLikes";
            })

            .addCase(getTotalVideoLikes.rejected, (state, action) => {
                state.error = action.payload.data || "An error occurred while fetching the total video likes.";
                state.lastAction = "getTotalVideoLikes";
            })

            //--- get total comment likes ---//

            .addCase(getTotalCommentLikes.pending, (state) => {
                state.error = null;
            })

            .addCase(getTotalCommentLikes.fulfilled, (state, action) => {
                state.error = null;
                state.commentLike = action.payload.data;
                state.lastAction = "getTotalCommentLikes";
            })

            .addCase(getTotalCommentLikes.rejected, (state, action) => {
                state.error = action.payload.data || "An error occurred while fetching the total comment likes.";
                state.lastAction = "getTotalCommentLikes";
            })

            // -- get total tweet likes --- //

            .addCase(getTotalTweetLikes.pending, (state) => {
                state.error = null;
            })

            .addCase(getTotalTweetLikes.fulfilled, (state, action) => {
                state.error = null;
                state.tweetLike = action.payload.data;
                state.lastAction = "getTotalTweetLikes";
            })

            .addCase(getTotalTweetLikes.rejected, (state, action) => {
                state.error = action.payload.data || "An error occurred while fetching the total tweet likes.";
                state.lastAction = "getTotalTweetLikes";
            })

    }

})

export default likeSlice.reducer;