import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import authReducer from './authSlice';
import promoReducer from './promoSlice';
import customerReducer from './customerSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    customer: customerReducer,
    promo: promoReducer
  }
});
