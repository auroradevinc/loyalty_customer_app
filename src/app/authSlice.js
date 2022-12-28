// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Amplify, Auth, Hub } from 'aws-amplify';

const initialState = {
  isAuthenticated: false, // True when all steps of authentication are complete. SignUp/SignIn & Confirmation/Verification.

  isSignedIn: false, // True when the user complete SignIn process successfully.
  isSignedUp: false, // True when the user complete SignUp process successfully.

  hasConfirmed: false, // True when user complete Confirmation/Verification.
  
  hasLocalFetched: false, // True when the user has fetched local data.
  
  localFetchError: null,
  autoSignInError: null,
  authError: null, // Stores error that occur during signIn & signUp

  confirmationCodeDetails: null,
  confirmationCodeError: null,
  confirmationCodeSentError: null,
  
  user: null
};

Amplify.configure({
  Auth: {
      mandatorySignIn: true,
      region: process.env.REACT_APP_AWS_COGNITO_REGION,
      userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_APP_CLIENT_ID
  }
});

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

      const signUpResponse = await Auth.signUp({username: email, password: password, attributes, autoSignIn: {enabled : true}});
      let signUpData;
      if (signUpResponse ) {
        signUpData = {
          username: signUpResponse.user.username,
          userSub: signUpResponse.userSub,
          userConfirmed: signUpResponse.userConfirmed,
          codeDeliveryDetails: signUpResponse.codeDeliveryDetails
        }
      }
      
      return {message: "successfully signed up", type: "success", data: signUpData};

      //TODO: AXIOS
      // if (signUpResponse && signUpResponse.attributes) {
      //   let data = {
      //     card: {
      //       id: '00AUVC'
      //     }, 
      //     customer: {
      //       id: signUpResponse.attributes.userSub, 
      //       full_name: name,
      //       email: email, 
      //       phone_number: phone
      //     }
      //   }
      //   console.log("authSlice signUp: axios data", data);
      //   const addUserToDB = await axios.post(`${process.env.REACT_APP_AWS_API_GATEWAY}/signup`, data);
      // }
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
      const signInResponse = await Auth.signIn({username: param.username, password: param.password});
      return {message: "successfully signed in", type: "success", data: ((signInResponse && signInResponse.attributes) ? signInResponse.attributes : signInResponse)};
    }
    catch (err){
      return {message: err.message, type: "error", data: null};
    }
  }
);

export const confirmCode = createAsyncThunk(
  'confirmCode',
  async (param) => {
    console.log("authSlice: confirmCode", param);
    try {
      const confirmationResponse = await Auth.confirmSignUp(param.username, param.code);
      return {message: "successfully confimed", type: "success", data: confirmationResponse};
    }
    catch (err){
      return {message: err.message, type: "error", data: null};
    }
  }
);

export const resendConfirmCode = createAsyncThunk(
  'resendConfirmCode',
  async (param) => {
    console.log("authSlice: resendConfirmCode", param);
    try {
      const response = await Auth.resendSignUp(param.username);

      return {message: "successfully sent code", type: "success", data: {...response, username: param.username}};
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
      const signOutResponse = await Auth.signOut();
      return {message: "successfully logged in", type: "success", data: signOutResponse};
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
        setUpAuthState: (state) => { 
          console.log("authSlice: setUpAuthState");
          state.isAuthenticated = false;
          
          state.isSignedIn = false;
          state.isSignedUp = false;

          state.hasConfirmed = false;
  
          state.hasLocalFetched = false;
          
          state.localFetchError = null;
          state.autoSignInError = null;
          state.authError = null;

          state.confirmationCodeDetails = null;
          state.confirmationCodeError = null;
          state.confirmationCodeSentError = null;
          
          state.user = null;
        },
        autoSignIn: (state, action) => { 
          console.log("authSlice: autoSignIn");
          if(action.payload.type === 'success'){
            console.log('\t Request fulfilled', {type: 'autoSignIn/fulfilled', payload: action.payload});
            state.isAuthenticated = true;
            state.user = action.payload.data;
            state.autoSignInError = null;
          }
          if(action.payload.type === 'error'){
            console.log('\t Request fulfilled', {type: 'autoSignIn/fulfilled', payload: action.payload});
            state.autoSignInError = action.payload.message;
          }
        }
    },
    extraReducers: (builder) => {
        // fetchUserFromLocal
        builder.addCase(fetchUserFromLocal.pending, (state, action) => {
          console.log("authSlice: fetchUserFromLocal Requested");
          console.log('\t Request Pending', action);
        });
        builder.addCase(fetchUserFromLocal.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.hasLocalFetched = true;
          } else {
            state.isAuthenticated = true; 
            state.hasLocalFetched = true;
            state.user = action.payload.data;
          }
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });
        builder.addCase(fetchUserFromLocal.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.localFetchError = action.payload.message;
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });

        // signUp
        builder.addCase(signUp.pending, (state, action) => {
          console.log("authSlice: signUp Requested");
          console.log('\t Request Pending', action);
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.authError = action.payload.message;
          } else { 
            state.isSignedUp = true; 
            state.user = action.payload.data; 
            state.confirmationCodeDetails = action.payload.data.codeDeliveryDetails;
          }
        });
        builder.addCase(signUp.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.authError = action.payload.message;
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });

        // signIn
        builder.addCase(signIn.pending, (state, action) => {
          console.log("authSlice: signIn Requested");
          console.log('\t Request Pending', action);
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.authError = action.payload.message;
            if(action.payload.message === 'User is not confirmed.'){ // implies the user successfully signed in with correct credentials but is not confirmed.
              state.isSignedIn = true; 
            }
          } else { 
            state.isSignedIn = true;
            state.isAuthenticated = true; // no "User not confirmed error" implies user is confirmed and hence authenticated
            state.user = action.payload.data;
          }
        });
        builder.addCase(signIn.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.authError = action.payload.message;
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });

        // confirmAccount
        builder.addCase(confirmCode.pending, (state, action) => {
          console.log("authSlice: confirmCode Requested");
          console.log('\t Request Pending', action);
        });
        builder.addCase(confirmCode.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.confirmationCodeError = action.payload.message;
          } else { 
            state.hasConfirmed = true;
          }
        });
        builder.addCase(confirmCode.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.confirmationCodeError = action.payload.message;
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });

        // resendConfirmCode
        builder.addCase(resendConfirmCode.pending, (state, action) => {
          console.log("authSlice: resendConfirmCode Requested");
          console.log('\t Request Pending', action);
        });
        builder.addCase(resendConfirmCode.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.confirmationCodeSentError = action.payload.message;
          } else { 
            state.confirmationCodeDetails = action.payload.data.CodeDeliveryDetails;
            state.user = {...state.user, 'username': action.payload.data.username};
          }
        });
        builder.addCase(resendConfirmCode.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.confirmationCodeSentError = action.payload.message;
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });

        // signOut
        builder.addCase(signOut.pending, (state, action) => {
          console.log("authSlice: signOut Requested");
          console.log('\t Request Pending', action);
        });
        builder.addCase(signOut.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.authError = action.payload.message;
          } else { 
            state.isAuthenticated = false;

            // clean up
            state.isSignedIn = false;
            state.isSignedUp = false;
            state.hasConfirmed = false;
            state.hasLocalFetched = false;
            state.localFetchError = null;
            state.authError = null;
            state.confirmationCodeDetails = null;
            state.confirmationCodeError = null;
            state.confirmationCodeSentError = null;
            state.user = null;
          }
        });
        builder.addCase(signOut.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.authError = action.payload.message;
          console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        });

    }
  });

export const authStore = (state) => state.auth;
export const { setUpAuthState, autoSignIn } = authSlice.actions;
export default authSlice.reducer;