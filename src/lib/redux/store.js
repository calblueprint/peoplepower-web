import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import userDataReducer from './userDataSlice';
import communityReducer from './communitySlice';

const reducers = combineReducers({
  userData: userDataReducer,
  community: communityReducer
});

// Redux persist saves and refreshes the redux store from local storage
const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Set up store with the appropriate reducers
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});
const persistor = persistStore(store);

// We keep the store in it's own file so that we can import the store from utility functions as well as components
export { store, persistor };
