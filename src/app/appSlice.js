// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  nav: {
    activeLink: ''
  },

  // SignUp Details
  hasSignUpDetailsSaved: false,
  auth: {
    signUp: null,
  },
  
  // Card Details
  isCardDetailsSaving: false,       // Loading variable for save card details etc.
  hasCardDetailsSaved: false,       //  True when operation is successful
  hasCardDetailsSavedFromURL: false,// True when card information is sourced from URL(via a scan to signup)
  hasCardDetailsSavingError: false, // True when operation is unsuccessful(produces error)
  cardDetailsSavingError: null,     // Store the error of the operation
  
  isCardDetailsAssigning: false,          // Loading variable for new assign card details
  hasNewCardDetailsAssigned: false,       // True when opteraion is successful
  hasNewCardDetailsAssigningError: false, // True when operation unsuccessful(produces error)
  newCardDetailsAssigningError: null,     // Store the error of the operation
  
  isCardDetailsVerifying: false,        // Loading variable for verify card details
  hasCardDetailsVerified: false,        // True when opteraion is successful
  hasCardDetailsVerifyingError: false,  // True when operation unsuccessful(produces error)
  verifyCardDetailsError: null,         // Store the error of the operation

  card: {}
};

// Async Functions
export const verifyCardDetails = createAsyncThunk(
  'verifyCardDetails',
  async (param) => {
    console.log("appSlice: verifyCardDetails");
    try{
      const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/verify-card?authorizer=${process.env.REACT_APP_AWS_API_KEY}&card_id=${param.id}&card_cvc=${param.cvc}`);
      if(res.data.type === "success"){ 
        return {message: "card valid", type: "success", data: null}; 
      }
      if(res.data.type === "error"){ 
        return {message: "card not valid", type: "error", data: null}; 
      }
    }
    catch(err){
      return {message: err.message, type: "error", data: null};
    }
  }
);

export const assignNewCardDetails = createAsyncThunk(
  'assignNewCardDetails',
  async (param) => {
    console.log("appSlice: assignNewCardDetails");
      try{
        const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/assign-new-card?authorizer=${process.env.REACT_APP_AWS_API_KEY}`);
        if(res.data.type === "success"){ 
          return {message: "card assigned", type: "success", data: res.data.data.card}; 
        }
        if(res.data.type === "error"){ 
          return {message: "card not assigned", type: "error", data: null}; 
        }
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
          state.hasSignUpDetailsSaved = true;
        },
        saveCardDetails: (state, action) => {
          console.log("appSlice: saveCardDetails");
          console.log('\t Request Fulfilled', {type: 'saveCardDetails/fulfilled', payload: action.payload});
          
          state.card = action.payload;
          
          state.isCardDetailsSaving = false;
          state.hasCardDetailsSaved = true;
          state.hasCardDetailsSavedFromURL = (action.payload.fromURL) ? true : false;
          state.hasCardDetailsSavingError = false;
          state.cardDetailsSavingError = null;
        }
    },
    extraReducers: (builder) => {
        // verifyCardDetails
        builder.addCase(verifyCardDetails.pending, (state, action) => {
          console.log("appSlice: verifyCardDetails Requested");
          console.log('\t Request Pending', action);
          state.isCardDetailsVerifying = true;
        });
        builder.addCase(verifyCardDetails.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.isCardDetailsVerifying = false;
            state.hasCardDetailsVerified = false;
            state.hasCardDetailsVerifyingError = true;
            state.verifyCardDetailsError = action.payload.message;
          } else {
            state.isCardDetailsVerifying = false;
            state.hasCardDetailsVerified = true;
            state.hasCardDetailsVerifyingError = false;
            state.verifyCardDetailsError = null;
          }
        });
        builder.addCase(verifyCardDetails.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.isCardDetailsVerifying = false;
          state.hasCardDetailsVerified = false;
          state.hasCardDetailsVerifyingError = true;
          state.verifyCardDetailsError = action.payload.message;
        });

        //assignNewCardDetails
        builder.addCase(assignNewCardDetails.pending, (state, action) => {
          console.log("appSlice: assignNewCard Requested");
          console.log('\t Request Pending', action);
          state.isCardDetailsAssigning = true;
        });
        builder.addCase(assignNewCardDetails.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.isCardDetailsAssigning = false;
            state.hasNewCardDetailsAssigned = false;
            state.hasNewCardDetailsAssigningError = true;
            state.newCardDetailsAssigningError = action.payload.message;
          } else {
            state.card = action.payload.data
            
            state.isCardDetailsSaving = false;
            state.hasCardDetailsSaved = true;
            state.hasCardDetailsSavingError = false;
            state.cardDetailsSavingError = null;

            state.isCardDetailsAssigning = false;
            state.hasNewCardDetailsAssigned = true;
            state.hasNewCardDetailsAssigningError = false;
            state.newCardDetailsAssigningError = null;
          }
        });
        builder.addCase(assignNewCardDetails.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.isCardDetailsAssigning = false;
          state.hasNewCardDetailsAssigned = false;
          state.hasNewCardDetailsAssigningError = true;
          state.newCardDetailsAssigningError = action.payload.message;
        });
    }
  });

export const appStore = (state) => state.app;
export const { updateActiveNav, saveSignUpDetails, saveCardDetails } = appSlice.actions;
export default appSlice.reducer;