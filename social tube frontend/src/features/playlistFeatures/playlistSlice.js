import { createSlice } from "@reduxjs/toolkit"
import { addVideoToPlaylist, CreatePlaylist, deletePlaylist, getPlaylistById, getUsersPlaylists, removeVideoFromPlaylist, updatePlaylist } from "./playlistThunk";

const initialState = {

    AllPlaylists : [],
    playlistObj : null,
    playlistModalOpen: false,
    Loading : false,
    error : null,
    lastAction : null

}

const playlistSlice = createSlice({
    name : "playlists",
    initialState,
    reducers:{

        // --- Toggle Playlist Modal --- //

        togglePlaylistModal: (state) => {
            state.playlistModalOpen = !state.playlistModalOpen;
        }

    },

    extraReducers:(builder) => {

        builder

        // --- Create Playlist --- //
        .addCase(CreatePlaylist.pending , (state) => {
            state.Loading = true;
            state.error = null;
            state.lastAction = null;
        })

        .addCase(CreatePlaylist.fulfilled , (state , action) => {

            state.Loading = false;
            state.playlistObj = action.payload.data;
            state.AllPlaylists.push(action.payload.data);
            state.error = null;
            state.lastAction = "createPlaylist";

        })

        .addCase(CreatePlaylist.rejected , (state , action) => {

            state.Loading = false;
            state.error = action.payload.data || "Failed to create playlist.";
            state.lastAction = "createPlaylist";
        })
        

        // --- Get Users Playlists --- //

        .addCase(getUsersPlaylists.pending , (state) => {
            state.Loading = true;
            state.error = null;
            state.lastAction = null;
        })

        .addCase(getUsersPlaylists.fulfilled , (state , action) => {

            state.Loading = false;
            state.AllPlaylists = action.payload.data;
            state.error = null;
            state.lastAction = "getUsersPlaylists";
        })  

        .addCase(getUsersPlaylists.rejected , (state , action) => {

            state.Loading = false;
            state.error = action.payload.data || "Failed to fetch user's playlists.";
            state.lastAction = "getUsersPlaylists";
        })

        // --- Get Playlist By Id --- //

        .addCase(getPlaylistById.pending , (state) => {
            state.Loading = true;
            state.error = null;
            state.lastAction = null;
        })

        .addCase(getPlaylistById.fulfilled , (state , action) => {

            state.Loading = false;
            state.playlistObj = action.payload.data;
            state.error = null;
            state.lastAction = "getPlaylistById";
        })

        .addCase(getPlaylistById.rejected , (state , action) => {

            state.Loading = false;
            state.error = action.payload.data || "Failed to fetch playlist details.";
            state.lastAction = "getPlaylistById";
        })

        // --- Add video to playlist --- //

        .addCase(addVideoToPlaylist.pending , (state) => {
            state.Loading = true;
            state.error = null;
            state.lastAction = null;
        })

        .addCase(addVideoToPlaylist.fulfilled , (state , action) => {

            state.Loading = false;
            state.playlistObj = action.payload.data;
            state.error = null;
            state.lastAction = "addVideoToPlaylist";
        })

        .addCase(addVideoToPlaylist.rejected , (state , action) => {

            state.Loading = false;
            state.error = action.payload.data || "Failed to add video to playlist.";
            state.lastAction = "addVideoToPlaylist";
        })

        // -- Remove video from playlist --- //

        .addCase(removeVideoFromPlaylist.pending , (state) => {
            state.Loading = true;
            state.error = null;
            state.lastAction = null;
        })

        .addCase(removeVideoFromPlaylist.fulfilled , (state , action) => {

            state.Loading = false;
            state.playlistObj = action.payload.data;
            state.error = null;
            state.lastAction = "removeVideoFromPlaylist";
        })

        .addCase(removeVideoFromPlaylist.rejected , (state , action) => {

            state.Loading = false;
            state.error = action.payload.data || "Failed to remove video from playlist.";
            state.lastAction = "removeVideoFromPlaylist";
        })

        // --- Delete Playlist --- //


        .addCase(deletePlaylist.pending , (state) => {
            state.Loading = true;
            state.error = null;
            state.lastAction = null;
        })

        .addCase(deletePlaylist.fulfilled , (state , action) => {

            state.Loading = false;
            state.playlistObj = null;
            state.AllPlaylists = state.AllPlaylists.filter(playlist => playlist._id !== action.payload.data._id);
            state.error = null;
            state.lastAction = "deletePlaylist";
        })

        .addCase(deletePlaylist.rejected , (state , action) => {   

            state.Loading = false;
            state.error = action.payload.data || "Failed to delete playlist.";
            state.lastAction = "deletePlaylist";
        })

        // --- Update playlist --- //

        .addCase(updatePlaylist.pending , (state) => {  

            state.Loading = true;
            state.error = null;
            state.lastAction = null;
        })

        .addCase(updatePlaylist.fulfilled , (state , action) => {
            state.Loading = false;
            state.playlistObj = action.payload.data;
            state.AllPlaylists = state.AllPlaylists.map(playlist => playlist._id === action.payload.data._id ? action.payload.data : playlist);
            state.error = null;
            state.lastAction = "updatePlaylist";
        })

        .addCase(updatePlaylist.rejected , (state , action) => {
            state.Loading = false;
            state.error = action.payload.data || "Failed to update playlist.";
            state.lastAction = "updatePlaylist";    
        })



    }
})


export default playlistSlice.reducer;

export const {togglePlaylistModal} = playlistSlice.actions;