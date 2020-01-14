import { configureStore } from '@reduxjs/toolkit';
import userDataReducer from './userData';

// Set up store with the appropriate reducers
const store = configureStore({
  reducer: {
    userData: userDataReducer
  }
});

// We keep the store in it's own file so that we can import the store from utility functions as well as components
export default store;
