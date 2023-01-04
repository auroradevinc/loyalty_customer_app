// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {

  isExtractingPromoFromDB: false,       // Loading variable for extracting/getting promo info. from db
  hasExtractedPromoFromDB: false,       // True when operation is successful
  hasExtractingPromoFromDBError: false, // True when operation is unsuccessful
  extractingPromoFromDBError: null,     // Store the error of the operation

  promo: {},
};

// Async Functions
export const getPromoFromDB = createAsyncThunk(
  'getPromoFromDB',
  async (param) => {
    console.log("promoSlice: getPromos");
    try {
      let id = param.card.id;
      const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-customer-promo-info?card_id=${id}`);
      return {message: "customer promo extracted from db", type: "success", data: res.data.data.promo};
    }
    catch (err){
      return {message: err.message, type: "error", data: null};
    }
  }
);

export const promoSlice = createSlice({
    name: 'promo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // getPromoFromDB
      builder.addCase(getPromoFromDB.pending, (state, action) => {
        console.log("promoSlice: getPromoFromDB Requested");
        console.log('\t Request Pending', action);
        state.isExtractingPromoFromDB = true;
      });
      builder.addCase(getPromoFromDB.fulfilled, (state, action) => {
        console.log('\t Request Fulfilled', action);
        if(action.payload.type === 'error'){ 
          state.isExtractingPromoFromDB = false;       
          state.hasExtractedPromoFromDB = false;       
          state.hasExtractingPromoFromDBError = true; 
          state.extractingPromoFromDBError = action.payload.message;
        } else {
          state.promo = action.payload.data;

          state.isExtractingPromoFromDB = false;       
          state.hasExtractedPromoFromDB = true;       
          state.hasExtractingPromoFromDBError = false; 
          state.extractingPromoFromDBError = null;
        }
        console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
      });
      builder.addCase(getPromoFromDB.rejected, (state, action) => {
        console.log('\t Request Rejected', action);
        console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        state.isExtractingPromoFromDB = false;       
        state.hasExtractedPromoFromDB = false;       
        state.hasExtractingPromoFromDBError = true; 
        state.extractingPromoFromDBError = action.payload.message;
      });
    }
  });

export const promoStore = (state) => state.promo;
export const { } = promoSlice.actions;
export default promoSlice.reducer;
