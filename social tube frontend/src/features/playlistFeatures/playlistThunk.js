import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Components/utils/Api";


// ---- Create Playlist ---- //

export const CreatePlaylist = createAsyncThunk("playlist/createPlaylist" ,
    async (playlistData , {rejectWithValue}) => {

        try {

            const res = await api.post("/playlists/create-playlist" , playlistData);          
            return res.data;
            
        } catch (error) {
            return rejectWithValue( error?.response?.data || "An error occurred while creating the playlist." );
        }

})


// --- Get Users Playlists --- //

export const getUsersPlaylists = createAsyncThunk("playlist/getUsersPlaylists" ,
    async (username, {rejectWithValue}) => {


        try {

            const res = await api.get(`/playlists/get-user-playlists/${username}`);          
            return res.data;
            
        } catch (error) {
            return rejectWithValue( error?.response?.data || "An error occurred while fetching the user's playlists." );
        }

    })


 // --- Get Playlist By Id --- //
 
export const getPlaylistById = createAsyncThunk("playlist/getPlaylistById" ,
    async (playlistId , {rejectWithValue}) => {
        try {

            const res = await api.get(`/playlists/get-playlist/${playlistId}`);
            return res.data;

        } catch (error) {
            return rejectWithValue( error?.response?.data || "An error occurred while fetching the playlist details." );
        }
    })

 // -- Add Video To Playlist --- //

export const addVideoToPlaylist = createAsyncThunk("playlist/addVideoToPlaylist" ,
    async ({playlistId , videoId} , {rejectWithValue}) => {
        try {

            const res = await api.get(`/playlists/add-video/${playlistId}/${videoId}`);
            return res.data;
        }
        catch (error) {
            return rejectWithValue( error?.response?.data || "An error occurred while adding the video to the playlist." );
        }
    })

// --- Remove Video From Playlist --- //

export const removeVideoFromPlaylist = createAsyncThunk("playlist/removeVideoFromPlaylist" ,
    async ({playlistId , videoId} , {rejectWithValue}) => {
        try {
            const res = await api.delete(`/playlists/add-video/${playlistId}/${videoId}`);
            return res.data;
        }
        catch (error) {
            return rejectWithValue( error?.response?.data || "An error occurred while removing the video from the playlist." );
        }
    })

    // --- Delete Playlist --- //

export const deletePlaylist = createAsyncThunk("playlist/deletePlaylist" ,
    async (playlistId , {rejectWithValue}) => {
        try {
            const res = await api.delete(`/playlists/get-playlist/${playlistId}`);
            return res.data;
        }
        catch (error) { 
            return rejectWithValue( error?.response?.data || "An error occurred while deleting the playlist." );
        }
    })

    // --- Update Playlist --- //

    export const updatePlaylist = createAsyncThunk("playlist/updatePlaylist" ,
        async ({playlistId , name , description} , {rejectWithValue}) => {
            try {
                const res = await api.patch(`/playlists/get-playlist/${playlistId}` ,{name , description});
                return res.data;
            }
            catch (error) {
                return rejectWithValue( error?.response?.data || "An error occurred while updating the playlist." );
            }
        })
