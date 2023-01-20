// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {

  isExtractingPromoFromDB: false,       // Loading variable for extracting/getting promo info. from db
  hasExtractedPromoFromDB: false,       // True when operation is successful
  hasExtractingPromoFromDBError: false, // True when operation is unsuccessful
  extractingPromoFromDBError: null,     // Store the error of the operation

  promo: {},
};

// Async Functions
export const getPromoFromDB = createAsyncThunk(
  'getPromoFromDB',
  async (param) => {
    console.log("promoSlice: getPromos");
    try {
      let id = param.card.id;
      let authHeaders = {
        'Authorization': param.session.jwtToken
      }
      const res = await axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/get-customer-promo-info?authorizer=${process.env.REACT_APP_AWS_CUSTOMER_API_KEY}&card_id=${id}`, {headers: authHeaders});
      let promos = modifyPromos(res.data.data.promo);
      
      return {message: "customer promo extracted from db", type: "success", data: promos};
    }
    catch (err){
      return {message: err.message, type: "error", data: null};
    }
  }
);

export const promoSlice = createSlice({
    name: 'promo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // getPromoFromDB
      builder.addCase(getPromoFromDB.pending, (state, action) => {
        console.log("promoSlice: getPromoFromDB Requested");
        console.log('\t Request Pending', action);
        state.isExtractingPromoFromDB = true;
      });
      builder.addCase(getPromoFromDB.fulfilled, (state, action) => {
        console.log('\t Request Fulfilled', action);
        if(action.payload.type === 'error'){ 
          state.isExtractingPromoFromDB = false;       
          state.hasExtractedPromoFromDB = false;       
          state.hasExtractingPromoFromDBError = true; 
          state.extractingPromoFromDBError = action.payload.message;
        } else {
          state.promo = action.payload.data;

          state.isExtractingPromoFromDB = false;       
          state.hasExtractedPromoFromDB = true;       
          state.hasExtractingPromoFromDBError = false; 
          state.extractingPromoFromDBError = null;
        }
        console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
      });
      builder.addCase(getPromoFromDB.rejected, (state, action) => {
        console.log('\t Request Rejected', action);
        console.log(`\t Message: ${action.payload.message}, Data: ${action.payload.data}`);
        state.isExtractingPromoFromDB = false;       
        state.hasExtractedPromoFromDB = false;       
        state.hasExtractingPromoFromDBError = true; 
        state.extractingPromoFromDBError = action.payload.message;
      });
    }
  });

export const promoStore = (state) => state.promo;
export const { } = promoSlice.actions;
export default promoSlice.reducer;


// Helper Functions
function dateOrdinal(d) {
  // To convert 01 to just 1
  let dateNum = parseInt(d);
  let dateString = String(dateNum);
  d = dateString;
  return d+(31==d||21==d||1==d?"st":22==d||2==d?"nd":23==d||3==d?"rd":"th")
};

function modifyPromos(promos) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  Object.entries(promos).forEach((promo) => { // custom_promo & all_promo
    promo[1].forEach((promoInfo, index) => { // promoInfo of each promo in custom_promo and all_promo
      // Covert To CamelCase
      promoInfo.client_name = promoInfo.client_name.toLowerCase().split(' ').map(elem => elem[0].toUpperCase()+ elem.slice(1)).join(' ');
      promoInfo.bus_name = promoInfo.bus_name.toLowerCase().split(' ').map(elem => elem[0].toUpperCase()+ elem.slice(1)).join(' ');
      promoInfo['bus_image'] = './business-logos/' + promoInfo.bus_name.toUpperCase().replaceAll(' ', '_').replaceAll('+', 'PLUS') + '.png';
      promoInfo.promo_image = './business-promos/' + promoInfo.promo_name.replaceAll(/%/g, '_PERCENT').replaceAll(/\$/g, 'DOLLAR_') + '.png';
      promoInfo.promo_name = promoInfo.promo_name.toLowerCase().split('_').map(elem => elem[0].toUpperCase()+ elem.slice(1)).join(' ');
      //promoInfo.promo_name = promoInfo.promo_name.split('_').join(' ');

      let date_from = (promoInfo.date_valid_from) ? promoInfo.date_valid_from.split('-') : null;
      let date_to = (promoInfo.date_valid_to) ? promoInfo.date_valid_to.split('-') : null;
      let date_from_month = (date_from) ? monthNames[date_from[1]-1] : null;
      let date_to_month = (date_to) ? monthNames[date_to[1]-1] : null;
      if(date_from_month === date_to_month){
        promoInfo['date_validity_simplified'] = `${date_from_month}, ${dateOrdinal(date_from[2])} - ${dateOrdinal(date_to[2])}`;
      }
      else if(!date_to_month) {
        promoInfo['date_validity_simplified'] = `${date_from_month}, ${dateOrdinal(date_from[2])}`;
      }
      else {
        promoInfo['date_valid_from_simplified'] = `${date_from_month}, ${dateOrdinal(date_from[2])}`;
        promoInfo['date_valid_to_simplified'] = `${date_to_month}, ${dateOrdinal(date_to[2])}`;
      }
    })
  });
  return promos;
}
