import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminReducer from "./AdminReducer";

const AdminSlice = createSlice({
    name : "Admin",
    initialState : {
Users : [],
Trans : [],
Tran : {},
isLoading : false,
isSuccess : false,
isError : false,
message : ""
    }, 
    reducers : {},
    extraReducers : (builder) =>{
        builder
        // All-Users Add-Case
        .addCase(GetAllUsers.pending , (state) =>{
            state.isLoading = true
        })
        .addCase(GetAllUsers.fulfilled, (state , action) =>{
            state.isSuccess = true
            state.Users = action.payload
        })
        .addCase(GetAllUsers.rejected, (state, action) =>{
            state.isError = true
            state.message = action.payload
        })

        // All-Trans Add-Case
        .addCase(GetAllTrans.pending , (state) =>{
            state.isLoading = true
        })
        .addCase(GetAllTrans.fulfilled, (state , action) =>{
            state.isSuccess = true
            state.Trans = action.payload
        })
        .addCase(GetAllTrans.rejected, (state, action) =>{
            state.isError = true
            state.message = action.payload
        })
    }
})


export default AdminSlice.reducer

// Fetch All Users Thunk
export const GetAllUsers = createAsyncThunk("ADMIN/ALL-USERS", async (_, thunkAPI) =>{
    const token = thunkAPI.getState().Auth?.All_Users?.token 
    try {
        return await AdminReducer.FetchAllUsers(token)
    } catch (error) {
        const message = error.response.data.message
        thunkAPI.rejectWithValue(message)
    }
})


// Fetch All Trans Thunk
export const GetAllTrans = createAsyncThunk("ADMIN/ALL-TRANS", async (_, thunkAPI) =>{
    const token = thunkAPI.getState().Auth?.All_Users?.token
    try {
        return await AdminReducer.FetchAllTrans(token)
    } catch (error) {
        const message = error.response.data.message
        thunkAPI.rejectWithValue(message)
    }
})