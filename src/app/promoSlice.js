// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  promos: [],
  error: null
};

// Async Functions
export const getPromos = createAsyncThunk(
  'getPromos',
  async (param) => {
    console.log("promoSlice: getPromos");
    try {
      setTimeout(() => {
        return {message: "promos fetched", type: "success", data: []};
      }, 3000)
    }
    catch (err){
      return {message: err, type: "error", data: null};
    }
  }
);

export const promoSlice = createSlice({
    name: 'promo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getPromos
        builder.addCase(getPromos.pending, (state, action) => {
          console.log('\t Request Pending', action);
        });
        builder.addCase(getPromos.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.error = action.payload.message;
          } else { 
            state.promos = action.payload.data;
            state.error = null;
          }
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });
        builder.addCase(getPromos.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });
    }
  });

export const promoStore = (state) => state.promo;
export const { } = promoSlice.actions;
export default promoSlice.reducer;
