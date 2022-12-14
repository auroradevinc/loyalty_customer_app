// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null
};

// Async Function
export const async_func = createAsyncThunk(
    'async_func',
    async (param) => {
      // const response = await axios.get(url/param);
      // The value we return becomes the `fulfilled` action payload
      // return response.data;
    }
  );

export const promoSlice = createSlice({
    name: 'promo',
    initialState,
    reducers: {
        log_func: (state, action) => { 
            //change state, param in action.payload
            console.log('Reducer Called');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(async_func.pending, (state) => {});
        builder.addCase(async_func.fulfilled, (state, action) => {console.log(action.payload)});
        builder.addCase(async_func.rejected, (state, action) => {console.log(action.payload)});
    }
  });

export const { log_func } = promoSlice.actions;
export default promoSlice.reducer;