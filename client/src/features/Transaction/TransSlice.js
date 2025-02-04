import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Add, FetchTrans, update } from "./TransService";

const TransSlice = createSlice({
    name: "Trans",
    initialState: {
        All_Trans: [],
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
    },
    reducers: {
        Remove: (state, action) => {
            state.All_Trans = state?.All_Trans?.transactions?.filter(trans => trans?._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // Add Transaction
            .addCase(AddTrans.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(AddTrans.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.All_Trans = [action.payload];
                state.isError = false;
            })
            .addCase(AddTrans.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || "An error occurred";
            })

            // Get Transaction
            .addCase(GetTrans.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(GetTrans.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.All_Trans = action.payload || [];
                state.isError = false;
            })
            .addCase(GetTrans.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch transactions";
            })

            // Update Transaction
            .addCase(UpdateTrans.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(UpdateTrans.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const updatedIndex = state.All_Trans.findIndex(trans => trans.id === action.payload.id);
                if (updatedIndex !== -1) {
                    state.All_Trans[updatedIndex] = action.payload;
                }
                state.isError = false;
            })
            .addCase(UpdateTrans.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || "Failed to update transaction";
            });
    },
});
export const { Remove } = TransSlice.actions;
export default TransSlice.reducer;

// Add Transaction Thunk
export const AddTrans = createAsyncThunk("ADD/TRANS", async (finalData, thunkAPI) => {
    const token = thunkAPI.getState().Auth?.All_Users?.token;
    if (!token) return thunkAPI.rejectWithValue("Token is missing");
    try {
        return await Add(finalData, token);
    } catch (error) {
        const message = error.response?.data?.message || "Failed to add transaction";
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Transaction Thunk
export const GetTrans = createAsyncThunk("FETCH/TRANS", async (_, thunkAPI) => {
    const token = thunkAPI.getState().Auth?.All_Users?.token;
    if (!token) return thunkAPI.rejectWithValue("Token is missing");
    try {
        return await FetchTrans(token);
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch transactions";
        return thunkAPI.rejectWithValue(message);
    }
});

// Update Transaction Thunk
export const UpdateTrans = createAsyncThunk("UPDATE/TRANS", async (id, thunkAPI) => {
    const token = thunkAPI.getState().Auth?.All_Users?.token;
    if (!token) return thunkAPI.rejectWithValue("Token is missing");
    try {
        return await update(id, token);
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update transaction";
        return thunkAPI.rejectWithValue(message);
    }
});


// Remove Transaction Thunk
export const RemoveTran = createAsyncThunk('REMOVE/TRANS' , async (_id , thunkAPI) =>{
    localStorage.removeItem("user._id")
})

