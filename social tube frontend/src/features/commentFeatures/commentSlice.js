import { createSlice } from "@reduxjs/toolkit"
import { addComment , getVideoComments } from "./commentThunks";




const initialState = {
    ALLComments: [],
    commentObj: null,
    loading: false,
    error: null,
    lastAction: null,
}

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {

        builder

            // --- Add Comment --- //

            .addCase(addComment.pending, (state) => {

                state.loading = true;
                state.error = null;
            })

            .addCase(addComment.fulfilled, (state, action) => {

                state.loading = false;
                state.error = null;
                state.commentObj = action.payload.data;
                state.lastAction = "addComment";
                state.ALLComments.push(action.payload.data);
            })

            .addCase(addComment.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload || "An error occurred while adding the comment.";
                state.lastAction = "addComment";
            })

            // -- get video comments -- //

            .addCase(getVideoComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getVideoComments.fulfilled, (state, action) => {

                state.loading = false;
                state.error = null;
                state.ALLComments = action.payload.data;
                state.lastAction = "getVideoComments";
            })

            .addCase(getVideoComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred while fetching video comments.";
                state.lastAction = "getVideoComments";
            })

    }
})



export default commentSlice.reducer;