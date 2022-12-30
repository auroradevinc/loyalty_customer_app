// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  nav: {
    active_link: ''
  },
  auth: {
    signUp: null,
  }
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateActiveNav: (state, action) => { 
          console.log("appSlice: updateActiveNav");
          console.log('\t Request Fulfilled', {type: 'updateActiveNav/fulfilled', payload: action.payload});
          state.nav.active_link = action.payload;
        },
        saveSignUpDetails: (state, action) => {
          console.log("appSlice: saveSignUpDetails");
          console.log('\t Request Fulfilled', {type: 'saveSignUpDetails/fulfilled', payload: action.payload});
          state.auth.signUp = action.payload;
        }
    },
    extraReducers: {}
  });

export const appStore = (state) => state.app;
export const { updateActiveNav, saveSignUpDetails } = appSlice.actions;
export default appSlice.reducer;
