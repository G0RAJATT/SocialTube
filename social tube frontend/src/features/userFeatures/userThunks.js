import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Components/utils/Api.js";

// ----  Thunk to register a new user ---- //

export const RegisterUser = createAsyncThunk(
    "users/register",
    async (formData, thunkAPI) => {

        try {

            const res = await api.post("/users/register", formData);
            return res.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.response?.data?.message || "Registeration failed")

        }

    }
)


// ----  Thunks for a login user ---- //

export const LoginUser = createAsyncThunk(
    "users/login",
    async ({ email, username, password }, thunkAPI) => {

        try {

            const res = await api.post("/users/login", { email, username, password })
            return res.data;

        } catch (error) {
            const message =
                error.response?.data;

            return thunkAPI.rejectWithValue(message);
        }
    }
)


// ----  Thunk to change password of a user ---- //

export const ChangeUserPassword = createAsyncThunk("users/changePassword",
    async ({ oldPassword, newPassword }, thunkAPI) => {

        try {
            const res = await api.post("/users/update-password", { oldPassword, newPassword });
            return res.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.response?.data || "Password change failed")
        }

    }
)

// ----  Thunk to update user details ---- //

// ---- coverImage update ---- //

export const updateCoverImage = createAsyncThunk("users/updateCoverImage",
    async (formData, thunkAPI) => {

        try {
 
            const res = await api.patch("/users/update-coverImage", formData)
            return res.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while updating Cover Image")
        }
    }
)


// ---- Avatar update ----//

export const updateAvatar = createAsyncThunk("users/updateAvatar" ,
    async(formData , thunkAPI) => {

        try {

             const res = await api.patch("/users/update-avatar", formData)
             return res.data;
            
        } catch (error) {

            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while updating Avatar Image")
        }
    }
)

// ---- Update Account details ---- //

export const updateAccount = createAsyncThunk("user/updateAccount",
    async ({fullName , email} , thunkAPI) => {

        try {

              const res = await api.patch("/users/update-account", {fullName , email})           
              return res.data;
            
        } catch (error) {
            
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while updating Account Details")
        }
    }
)


// ---- Get Channel Profile ---- //

export const getChannelProfile = createAsyncThunk("users/getChannelProfile",
    async ({userId} , thunkAPI) => { 

        try {

            const res = await api.get(`/users/channel/${userId}`); 
            return res.data;
            
        } catch (error) {
            
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while fetching channel details")
        }
    })

    // ---- get User history ---- //

export const getUserHistory = createAsyncThunk("users/getUserHistory",
    async (_, thunkAPI) => {


      try {

        console.log(api.defaults.withCredentials);
        const res = await api.get("/users/watch-history");      
        return res.data;
        
      } catch (error) {
        
        return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while fetching user history")
      }


    })   


    // --- get current user --- //

    export const getCurrentUser = createAsyncThunk("users/getCurrentUser",
    async (_, thunkAPI) => {    

        try {

            const res = await api.get("/users/current-user");
            return res.data;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while fetching user details")
        }
    })


    // --- toggle subscription --- //

    export const toggleSubscription = createAsyncThunk("users/toggleSubscription",
        async ( channelId , thunkAPI) => {

            try {

                const res = await api.post(`/subscriptions/subscribe/${channelId}`)
                return res.data;
                
            } catch (error) {
                
                return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong while fetching user details")
            }
        }
    )