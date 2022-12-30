// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  nav: {
    activeLink: ''
  },
  hasSignUpDetails: false,
  auth: {
    signUp: null,
  },
  hasCardDetails: false,
  isCardDetailsVerified: false,
  verifyCardDetailsError: null,
  card: {
    id: null,
    cvc: null,
  }
};

// Async Functions
export const saveCardDetails = createAsyncThunk(
  'saveCardDetails',
  async (param) => {
    console.log("appSlice: saveCardDetails");
      try{
        const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/verify-card?card_id=${param.id}&card_cvc=${param.cvc}`);
        if(res.data.type === "success"){ return {message: "card verified", type: "success", data: {id: param.id, cvc: param.cvc}}; }
        if(res.data.type === "error"){ return {message: "card not verified", type: "error", data: null}; }
      }
      catch(err){
        return {message: err.message, type: "error", data: null};
      }
  }
);

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateActiveNav: (state, action) => { 
          console.log("appSlice: updateActiveNav");
          console.log('\t Request Fulfilled', {type: 'updateActiveNav/fulfilled', payload: action.payload});
          state.nav.activeLink = action.payload;
        },
        saveSignUpDetails: (state, action) => {
          console.log("appSlice: saveSignUpDetails");
          console.log('\t Request Fulfilled', {type: 'saveSignUpDetails/fulfilled', payload: action.payload});
          state.auth.signUp = action.payload;
          state.hasSignUpDetails = true;
        }
    },
    extraReducers: (builder) => {
        // saveCardDetails
        builder.addCase(saveCardDetails.pending, (state, action) => {
          console.log("appSlice: saveCardDetails Requested");
          console.log('\t Request Pending', action);
        });
        builder.addCase(saveCardDetails.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.verifyCardDetailsError = action.payload.message;
          } else {
            state.card.id = action.payload.data.id;
            state.card.cvc = action.payload.data.cvc;
            state.hasCardDetails = true;
            state.isCardDetailsVerified = true;
          }
        });
        builder.addCase(saveCardDetails.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.verifyCardDetailsError = action.payload.message;
        });
    }
  });

export const appStore = (state) => state.app;
export const { updateActiveNav, saveSignUpDetails } = appSlice.actions;
export default appSlice.reducer;
