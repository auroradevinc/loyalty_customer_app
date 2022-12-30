// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  isCustomerAddedToDB: false,
  isCustomerExtractedFromDB: false,

  addCustomerToDBError: null,
  getCustomerFromDBError: null,

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
            id: '00AUVC' // TODO: CONFIGURE TO HAVE THIS EXTRACTED FROM THE LINK OR CUSTOMER SPECIFIED
          }, 
          customer: {
            id: param.id, 
            full_name: param.name,
            email: param.email, 
            phone_number: param.phone,
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
        let id = param.id;
        const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-customer-info?customer_id=${id}`);
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
        });
        builder.addCase(addCustomerToDB.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.addCustomerToDBError = action.payload.message;
          } else {
            state.customer = action.payload.data;
            state.isCustomerAddedToDB = true;
            state.isCustomerExtractedFromDB = true;
          }
        });
        builder.addCase(addCustomerToDB.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.addCustomerToDBError = action.payload.message;
        });

        // getCustomerFromDB
        builder.addCase(getCustomerFromDB.pending, (state, action) => {
          console.log("customerSlice: getCustomerFromDB Requested");
          console.log('\t Request Pending', action);
        });
        builder.addCase(getCustomerFromDB.fulfilled, (state, action) => {
          console.log('\t Request Fulfilled', action);
          if(action.payload.type === 'error'){ 
            state.getCustomerFromDBError = action.payload.message;
          } else {
            state.customer = action.payload.data;
            state.isCustomerExtractedFromDB = true;
          }
        });
        builder.addCase(getCustomerFromDB.rejected, (state, action) => {
          console.log('\t Request Rejected', action);
          state.getCustomerFromDBError = action.payload.message;
        });
    }
  });

export const customerStore = (state) => state.customer;
export const { log_func } = customerSlice.actions;
export default customerSlice.reducer;