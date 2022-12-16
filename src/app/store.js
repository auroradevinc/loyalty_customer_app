import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import promoReducer from './promoSlice';
import customerReducer from './customerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    promo: promoReducer
  }
});
