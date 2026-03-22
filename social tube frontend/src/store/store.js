import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userFeatures/userSlice.js";
import videoReducer from "../features/videoFeatures/videoSlice.js";
import tweetReducer from "../features/tweetFeatures/tweetSlice.js";
import commentReducer from "../features/commentFeatures/commentSlice.js";
import playlistReducer from "../features/playlistFeatures/playlistSlice.js";
import likeReducer from "../features/likeFeatures/likeSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        video: videoReducer,
        tweet: tweetReducer,
        comment: commentReducer,
        playlist: playlistReducer,
        like: likeReducer
    }
})