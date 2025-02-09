import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login, Register } from "./AuthService";

const ExistUser = JSON.parse(localStorage.getItem("user"))

const AuthSlice = createSlice({
    name : "Auth",
    initialState : {
        All_Users : ExistUser || null,
        isLoading : false,
        isSuccess : false,
        isError : false,
        message : ""
    },
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(RegisterUser.pending , (state, action) =>{
state.isLoading = true
state.isSuccess = false
state.isError = false
        })
        .addCase(RegisterUser.fulfilled , (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.All_Users = action.payload
            state.isError = false
                    })
                    .addCase(RegisterUser.rejected , (state, action) =>{
                        state.isLoading = false
                        state.isSuccess = false
                        state.isError = true
                        state.message = action.payload
                                })


                                .addCase(LoginUser.pending , (state, action) =>{
                                    state.isLoading = true
                                    state.isSuccess = false
                                    state.isError = false
                                            })
                                            .addCase(LoginUser.fulfilled , (state, action) =>{
                                                state.isLoading = false
                                                state.isSuccess = true
                                                state.All_Users = action.payload
                                                state.isError = false
                                                        })
                                                        .addCase(LoginUser.rejected , (state, action) =>{
                                                            state.isLoading = false
                                                            state.isSuccess = false
                                                            state.isError = true
                                                            state.message = action.payload
                                                                    })
                                                                    .addCase(LogoutUser.fulfilled , (state, action) =>{
                                                                        state.isLoading = false
                                                                        state.isSuccess = false
                                                                        state.isError = false
                                                                        state.message = ""
                                                                        state.All_Users = null
                                                                                })
    }
})


export default AuthSlice.reducer


// Register Thunk
export const RegisterUser = createAsyncThunk('AUTH/REGISTER' , async (formData , thunkAPI) =>{
    try {
        return await Register(formData)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// Login Thunk
export const LoginUser = createAsyncThunk('AUTH/LOGIN' , async (formData , thunkAPI) =>{
    try {
        return await Login(formData)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


// LogOut User Thunk
export const LogoutUser = createAsyncThunk('AUTH/LOGOUT' , (_, thunkAPI) =>{
localStorage.removeItem("user")
return thunkAPI.fulfillWithValue(null)
})