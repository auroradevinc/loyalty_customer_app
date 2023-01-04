// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  isCardExtractingFromDB: false,       // Loading variable for extracting/getting Card info. from db
  hasCardExtractedFromDB: false,       // True when operation is successful
  hasCardExtractingFromDBError: false, // True when operation is unsuccessful
  extractingCardFromDBError: null,     // Store the error of the operation

  card: null,
};

// Async Function
export const getCardFromDB = createAsyncThunk(
'getCardFromDB',
async (param) => {
    console.log("CardSlice: getCardFromDB");
    try{
    let id = param.customer.id;
    const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-customer-card-info?customer_id=${id}`);
    return {message: "Card extracted from db", type: "success", data: res.data.data.card};
    }
    catch(err){
    return {message: err.message, type: "error", data: null};
    }
}
);

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getCardFromDB
        builder.addCase(getCardFromDB.pending, (state, action) => {
          console.log("cardSlice: getCardFromDB Requested");
          console.log('\t Request Pending', action);
          state.isCardExtractingFromDB = true;
        });
        builder.addCase(getCardFromDB.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.isCardExtractingFromDB = false;       
            state.hasCardExtractedFromDB = false;       
            state.hasCardExtractingFromDBError = true; 
            state.extractingCardFromDBError = action.payload.message;    
          } else {
            state.card = action.payload.data;

            state.isCardExtractingFromDB = false;       
            state.hasCardExtractedFromDB = true;       
            state.hasCardExtractingFromDBError = false; 
            state.extractingCardFromDBError = null;
          }
        });
        builder.addCase(getCardFromDB.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.isCardExtractingFromDB = false;       
          state.hasCardExtractedFromDB = false;       
          state.hasCardExtractingFromDBError = true; 
          state.extractingCardFromDBError = action.payload.message;
        });
    }
  });

export const cardStore = (state) => state.card;
export const {  } = cardSlice.actions;
export default cardSlice.reducer;