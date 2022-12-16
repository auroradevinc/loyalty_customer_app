// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Auth } from 'aws-amplify';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null
};

// Async Functions
export const fetchUserFromLocal = createAsyncThunk(
  'fetchUserFromLocal',
  async (param) => {
    console.log("authSlice: fetchUserFromLocal");
    try {
      const session = await Auth.currentSession();
      const user = await Auth.currentAuthenticatedUser();
      return {message: "user fetched", type: "success", data: ((user && user.attributes) ? user.attributes : user)};
    }
    catch (err){
      return {message: err, type: "error", data: null};
    }
  }
);

export const signIn = createAsyncThunk(
  'signIn',
  async (param) => {
    console.log("authSlice: signIn");
    try {
      const signUpResponse = await Auth.signIn({username: param.email, password: param.password});
      return {message: "successfully logged in", type: "success", data: ((signUpResponse && signUpResponse.attributes) ? signUpResponse.attributes : signUpResponse)};
    }
    catch (err){
      return {message: err.message, type: "error", data: null};
    }
  }
);

export const signOut = createAsyncThunk(
  'signOut',
  async (param) => {
    console.log("authSlice: signOut");
    try {
      const signUpResponse = await Auth.signOut();
      return {message: "successfully logged in", type: "success", data: signUpResponse};
    }
    catch (err){
      return {message: err.message, type: "error", data: null};
    }
  }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // signIn: (state, action) => { 
        //   console.log("authSlice: signIn", action.payload);
        // }
    },
    extraReducers: (builder) => {
        // fetchUserFromLocal
        builder.addCase(fetchUserFromLocal.pending, (state, action) => {
          console.log('\t Request Pending', action);
        });
        builder.addCase(fetchUserFromLocal.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.error = action.payload.message;
            state.isAuthenticated = false; 
          } else { 
            state.user = action.payload.data; 
            state.isAuthenticated = true;
          }
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });
        builder.addCase(fetchUserFromLocal.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.isAuthenticated = false;
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });

        // signIn
        builder.addCase(signIn.pending, (state, action) => {
          console.log('\t Request Pending', action);
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.error = action.payload.message;
            state.isAuthenticated = false; 
          } else { 
            state.user = action.payload.data; 
            state.isAuthenticated = true;
          }
        });
        builder.addCase(signIn.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.isAuthenticated = false;
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });

        // signOut
        builder.addCase(signOut.pending, (state, action) => {
          console.log('\t Request Pending', action);
        });
        builder.addCase(signOut.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.error = action.payload.message;
            state.isAuthenticated = true; 
          } else { 
            state.user = null; 
            state.isAuthenticated = false;
          }
        });
        builder.addCase(signOut.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.error = action.payload.message
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });

    }
  });

export const authStore = (state) => state.auth;
export const { } = authSlice.actions;
export default authSlice.reducer;