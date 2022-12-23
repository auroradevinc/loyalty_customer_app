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

export const signUp = createAsyncThunk(
  'signUp',
  async (param) => {
    console.log("authSlice: signUp");
    try {
      let email = param.email;
      let phone = param.phone;
      let password = param.password;
      let name = param.name;
      let attributes = {email, phone_number: phone, name};
      const signUpResponse = await Auth.signUp({username: email, password: password, attributes});
      return {message: "successfully signed up", type: "success", data: ((signUpResponse && signUpResponse.attributes) ? signUpResponse.attributes : signUpResponse)};
    }
    catch (err){
      return {message: err.message, type: "error", data: null};
    }
  }
);

export const signIn = createAsyncThunk(
  'signIn',
  async (param) => {
    console.log("authSlice: signIn");
    try {
      const signUpResponse = await Auth.signIn({username: param.username, password: param.password});
      console.log(signUpResponse);
      return {message: "successfully signed in", type: "success", data: ((signUpResponse && signUpResponse.attributes) ? signUpResponse.attributes : signUpResponse)};
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
            state.isAuthenticated = false; 
            state.error = action.payload.message;
          } else { 
            state.user = action.payload.data; 
            state.isAuthenticated = true;
            state.error = null;
          }
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });
        builder.addCase(fetchUserFromLocal.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.isAuthenticated = false;
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });

        // signUp
        builder.addCase(signUp.pending, (state, action) => {
          console.log('\t Request Pending', action);
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.isAuthenticated = false; 
            state.error = action.payload.message;
          } else { 
            state.user = action.payload.data; 
            state.isAuthenticated = true;
            state.error = null;
          }
        });
        builder.addCase(signUp.rejected, (state, action) => {
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
            state.isAuthenticated = false; 
            state.error = action.payload.message;
          } else { 
            state.user = action.payload.data; 
            state.isAuthenticated = true;
            state.error = null;
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
            state.isAuthenticated = true; 
            state.error = action.payload.message;
          } else { 
            state.user = null; 
            state.isAuthenticated = false;
            state.error = null;
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
