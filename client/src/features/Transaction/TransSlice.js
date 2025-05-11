import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transService, { Add, FetchTrans } from "./TransService";

const TransSlice = createSlice({
    name: "Trans",
    initialState: {
        All_Trans: [],
        Edit : {trans : {}, isEdit : false},
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
    },
    reducers: {
        Remove: (state, action) => {
            if (state.All_Trans?.transactions) {
                state.All_Trans.transactions = state.All_Trans.transactions.filter(
                    trans => trans._id !== action.payload
                );
            } else {
                state.All_Trans = state.All_Trans.filter(trans => trans._id !== action.payload);
            }
        },
        Update : (state , action) => {
return {
    ...state,
    Edit : {trans : action.payload , isEdit : true}
}
        },
        restore : () =>{
            return {
                All_Trans: [],
                Edit : {trans : {}, isEdit : false},
                isLoading: false,
                isSuccess: false,
                isError: false,
                message: "",
            }
        }
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
                state.message = "Transaction updated successfully";
          
                state.All_Trans.transactions = state?.All_Trans?.transactions?.map(trans =>
                    trans._id === action.payload?._id ? action.payload : trans
                  );
                  state.Edit = { isEdit: false, trans: {} }; // Clear edit mode
              })

            .addCase(UpdateTrans.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || "Failed to update transaction";
            })

            // Delete Transaction
            .addCase(DeleteTrans.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(DeleteTrans.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.All_Trans.transactions = state.All_Trans.transactions.filter(trans => trans._id !== action.payload)
                state.isError = false;
            })
            .addCase(DeleteTrans.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || "Failed to update transaction";
            })
    },
});
export const { Remove , restore , Update } = TransSlice.actions;
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
    const updateData = thunkAPI.getState().Trans?.Edit?.trans;
    // console.log(updateData)
  
    if (!token) return thunkAPI.rejectWithValue("Token is missing");
    if (!updateData) return thunkAPI.rejectWithValue("No data to update");
  
    try {
      return await transService.update(id, updateData, token);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update transaction";
      return thunkAPI.rejectWithValue(message);
    }
  });
  

// Delete Transaction Thunk
export const DeleteTrans = createAsyncThunk("DELETE/TRANS", async (id, thunkAPI) => {
    const token = thunkAPI.getState().Auth?.All_Users?.token;
    if (!token) return thunkAPI.rejectWithValue("Token is missing");

    try {
        localStorage.removeItem("user._id")
      return await transService.deleteTransaction(id, token);
        // return _id; // ✅ Delete ke baad frontend state se bhi hatao
    } catch (error) {
        const message = error.response?.data?.message || "Failed to delete transaction";
        return thunkAPI.rejectWithValue(message);
    }
});