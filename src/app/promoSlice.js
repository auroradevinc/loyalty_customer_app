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
      // function(state, action) => { //change state, param in action.payload}
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, (state) => {});
        builder.addCase(incrementAsync.fulfilled, (state, action) => {console.log(action.payload)});
        builder.addCase(incrementAsync.rejected, (state, action) => {console.log(action.payload)});
    }
  });

export const {} = promoSlice.actions;
export default promoSlice.reducer;