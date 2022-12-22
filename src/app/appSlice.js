// Base Import for Actions & Reducers
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  nav: {
    active_link: ''
  }
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        updateActiveNav: (state, action) => { 
          console.log("appSlice: updateActiveNav", action.payload);
          state.nav.active_link = action.payload;
        }
    },
    extraReducers: {}
  });

export const appStore = (state) => state.app;
export const { updateActiveNav } = appSlice.actions;
export default appSlice.reducer;
