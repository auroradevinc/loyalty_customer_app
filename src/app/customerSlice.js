// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  isCustomerAddingToDB: false,       // Loading variable for adding customer info. to db
  hasCustomerAddedToDB: false,       // True when operation is successful
  hasCustomerAddingToDBError: false, // True when operation is unsuccessful
  addCustomerToDBError: null,        // Store the error of the operation

  isCustomerExtractingFromDB: false,       // Loading variable for extracting/getting customer info. from db
  hasCustomerExtractedFromDB: false,       // True when operation is successful
  hasCustomerExtractingFromDBError: false, // True when operation is unsuccessful
  extractingCustomerFromDBError: null,     // Store the error of the operation

  customer: null,
};

// Async Function
export const addCustomerToDB = createAsyncThunk(
    'addCustomerToDB',
    async (param) => {
      console.log("customerSlice: addCustomerToDB");
      try{
        let data = {
          card: {
            id: param.card.id // TODO: CONFIGURE TO HAVE THIS EXTRACTED FROM THE LINK OR CUSTOMER SPECIFIED
          }, 
          customer: {
            id: param.customer.id, 
            full_name: param.customer.name,
            email: param.customer.email, 
            phone_number: param.customer.phone,
            address: null
          }
        };
        const res = await axios.post(`${process.env.REACT_APP_AWS_API_GATEWAY}/signup`, data);
        return {message: "customer added to db", type: "success", data: res.data};
      }
      catch(err){
        return {message: err.message, type: "error", data: null};
      }
    }
  );

  export const getCustomerFromDB = createAsyncThunk(
    'getCustomerFromDB',
    async (param) => {
      console.log("customerSlice: getCustomerFromDB");
      try{
        let id = param.customer.id;
        let authHeaders = {
          'Authorization': param.session.jwtToken
        }
        const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-customer-info?authorizer=${process.env.REACT_APP_AWS_CUSTOMER_API_KEY}&customer_id=${id}`, {headers: authHeaders});
        
        let customer = res.data.data.customer;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let date = customer.member_since.split('-')
        customer['member_since_simplified'] = `${monthNames[date[1]-1]} ${date[0]}`;
        
        return {message: "customer extracted from db", type: "success", data: res.data.data.customer};
      }
      catch(err){
        return {message: err.message, type: "error", data: null};
      }
    }
  );

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
      log_func: (state, action) => { 
          //change state, param in action.payload
          console.log('Reducer Called');
      }
    },
    extraReducers: (builder) => {
      // addCustomerToDB
      builder.addCase(addCustomerToDB.pending, (state, action) => {
        console.log("customerSlice: addCustomerToDB Requested");
        console.log('\t Request Pending', action);
        state.isCustomerAddingToDB = true;
      });
      builder.addCase(addCustomerToDB.fulfilled, (state, action) => {
        console.log('\t Request Fulfilled', action);
        if(action.payload.type === 'error'){ 
          state.isCustomerAddingToDB = false;       
          state.hasCustomerAddedToDB = false;       
          state.hasCustomerAddingToDBError = true; 
          state.addCustomerToDBError = action.payload.message;       
        } else {
          state.customer = action.payload.data;

          state.isCustomerAddingToDB = false;       
          state.hasCustomerAddedToDB = true;       
          state.hasCustomerAddingToDBError = false; 
          state.addCustomerToDBError = null;
        }
      });
      builder.addCase(addCustomerToDB.rejected, (state, action) => {
        console.log('\t Request Rejected', action);
        state.isCustomerAddingToDB = false;       
        state.hasCustomerAddedToDB = false;       
        state.hasCustomerAddingToDBError = true; 
        state.addCustomerToDBError = action.payload.message;
      });

      // getCustomerFromDB
      builder.addCase(getCustomerFromDB.pending, (state, action) => {
        console.log("customerSlice: getCustomerFromDB Requested");
        console.log('\t Request Pending', action);
        state.isCustomerExtractingFromDB = true;
      });
      builder.addCase(getCustomerFromDB.fulfilled, (state, action) => {
        console.log('\t Request Fulfilled', action);
        if(action.payload.type === 'error'){ 
          state.isCustomerExtractingFromDB = false;       
          state.hasCustomerExtractedFromDB = false;       
          state.hasCustomerExtractingFromDBError = true; 
          state.extractingCustomerFromDBError = action.payload.message;    
        } else {
          state.customer = action.payload.data;

          state.isCustomerExtractingFromDB = false;       
          state.hasCustomerExtractedFromDB = true;       
          state.hasCustomerExtractingFromDBError = false; 
          state.extractingCustomerFromDBError = null;
        }
      });
      builder.addCase(getCustomerFromDB.rejected, (state, action) => {
        console.log('\t Request Rejected', action);
        state.isCustomerExtractingFromDB = false;       
        state.hasCustomerExtractedFromDB = false;       
        state.hasCustomerExtractingFromDBError = true; 
        state.extractingCustomerFromDBError = action.payload.message;
      });
    }
  });

export const customerStore = (state) => state.customer;
export const { log_func } = customerSlice.actions;
export default customerSlice.reducer;