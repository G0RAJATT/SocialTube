import { createSlice, nanoid } from "@reduxjs/toolkit";
import {
    ChangeUserPassword,
    getChannelProfile,
    getCurrentUser,
    getUserHistory,
    LoginUser,
    RegisterUser,
    updateAccount,
    updateAvatar,
    updateCoverImage
} from "./userThunks";

const initialState = {

    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    lastAction: null

}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {

        builder

            // ----  Register User ---- //

            .addCase(RegisterUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(RegisterUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.data;
            })

            .addCase(RegisterUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ---- Auth / Login User ---- //

            .addCase(LoginUser.pending, (state) => {

                state.loading = true;
                state.error = null;
            })

            .addCase(LoginUser.fulfilled, (state, action) => {

                state.loading = false;
                state.error = null;
                state.user = action.payload.data.user;
                console.log("User slice: \n" , state.user);
                
                state.isAuthenticated = true;

            })

            .addCase(LoginUser.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })

            //---- Change Password ----//

            .addCase(ChangeUserPassword.pending, (state) => {

                state.loading = true;
                state.error = null;
            })

            .addCase(ChangeUserPassword.fulfilled, (state, action) => {

                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
            })

            .addCase(ChangeUserPassword.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            })

            // ---- Update user details ----//

            // ---- Update Cover Image ----//

            .addCase(updateCoverImage.pending, (state) => {

                state.loading = true;
                state.error = null;
            })

            .addCase(updateCoverImage.fulfilled, (state, action) => {

                state.loading = false;
                state.error = null;
                state.user = action.payload.data;
            })

            .addCase(updateCoverImage.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })


            // ---- Update Avatar ----//

            .addCase(updateAvatar.pending, (state) => {

                state.loading = true;
                state.error = null;
            })

            .addCase(updateAvatar.fulfilled, (state, action) => {

                state.loading = false;
                state.error = null;
                state.user = action.payload.data;
            })

            .addCase(updateAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // ---- update Account Details ----//

            .addCase(updateAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.lastAction = null;
            })

            .addCase(updateAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.data;
                state.lastAction = "Account Updated";
            })

            .addCase(updateAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- get user profile details --- //

            .addCase(getChannelProfile.pending , (state) => {
                state.loading = true;
                state.error = null;
            }) 

            .addCase(getChannelProfile.fulfilled , (state , action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.data;
                state.lastAction = "Channel Profile Fetched";
            })

            .addCase(getChannelProfile.rejected , (state , action) => {
                state.loading = false;
                state.error = action.payload;
                state.lastAction = "channel profile fetch failed";
            })

            // --- get user history --- //

            .addCase(getUserHistory.pending , (state) => {

                state.loading = true;
                state.error = null;
            })

            .addCase(getUserHistory.fulfilled , (state , action) => {  

                state.loading = false;
                state.error = null;
                state.user = action.payload.data;
                state.lastAction = "get user history success";
            })

            .addCase(getUserHistory.rejected , (state , action) => {
                state.loading = false;
                state.error = action.payload;
                state.lastAction = "get user history failed";
            })

            // -- get current user -- //

            .addCase(getCurrentUser.pending , (state ) => {

                state.loading = true;
                state.error = null;

            })

            .addCase(getCurrentUser.fulfilled , (state , action) => {

                state.loading = false;
                state.error = null;
                state.user = action.payload.data;
                state.isAuthenticated = true;
                state.lastAction = "get current user";

            })

            .addCase(getCurrentUser.rejected , (state , action) => {

                state.loading = false;
                state.error = action.payload.data;
                state.isAuthenticated = false;
                state.lastAction = "get current user";
            })
    } 
})



export default userSlice.reducer

