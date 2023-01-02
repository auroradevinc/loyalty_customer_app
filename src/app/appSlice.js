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
  
  isCardDetailsSaving: false, //Loading variable for save card details etc.
  isCardDetailsAssigning: false, //Loading variable for new assign card details
  hasCardDetails: false,
  hasAssignedNewCard: false,
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
        if(!(param.id && param.cvc)){ 
          return {message: 'card details not present', type: "error", data: null};
        }
        const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/verify-card?card_id=${param.id}&card_cvc=${param.cvc}`);
        if(res.data.type === "success"){ return {message: "card valid", type: "success", data: {id: param.id, cvc: param.cvc}}; }
        if(res.data.type === "error"){ return {message: "card not valid", type: "error", data: null}; }
      }
      catch(err){
        return {message: err.message, type: "error", data: null};
      }
  }
);

export const assignNewCard = createAsyncThunk(
  'assignNewCard',
  async (param) => {
    console.log("appSlice: assignNewCard");
      try{
        const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/assign-new-card`);
        if(res.data.type === "success"){ return {message: "card assigned", type: "success", data: res.data.data.card}; }
        if(res.data.type === "error"){ return {message: "card not assigned", type: "error", data: null}; }
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
          state.isCardDetailsSaving = true;
        });
        builder.addCase(saveCardDetails.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.verifyCardDetailsError = action.payload.message;
            state.isCardDetailsSaving = false;
          } else {
            state.card.id = action.payload.data.id;
            state.card.cvc = action.payload.data.cvc;
            state.hasCardDetails = true;
            state.isCardDetailsVerified = true;
            state.isCardDetailsSaving = false;
          }
        });
        builder.addCase(saveCardDetails.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.verifyCardDetailsError = action.payload.message;
          state.isCardDetailsSaving = false;
        });

        //assignNewCard
        builder.addCase(assignNewCard.pending, (state, action) => {
          console.log("appSlice: assignNewCard Requested");
          console.log('\t Request Pending', action);
          state.isCardDetailsAssigning = true;
        });
        builder.addCase(assignNewCard.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.verifyCardDetailsError = action.payload.message;
            state.isCardDetailsAssigning = false;
          } else {
            state.card.id = action.payload.data.id;
            state.card.cvc = action.payload.data.cvc;
            state.hasCardDetails = true;
            state.isCardDetailsVerified = true;
            state.hasAssignedNewCard = true;
            state.isCardDetailsAssigning = false;
          }
        });
        builder.addCase(assignNewCard.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.verifyCardDetailsError = action.payload.message;
          state.isCardDetailsAssigning = false;
        });
    }
  });

export const appStore = (state) => state.app;
export const { updateActiveNav, saveSignUpDetails } = appSlice.actions;
export default appSlice.reducer;