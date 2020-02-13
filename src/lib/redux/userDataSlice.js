/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// This is a slice created using the Redux Toolkits.
// It sets up both the reducers and actions for a particular slice of the redux store
//
// The user data slice stores all authentication and user information

const initialState = {
  authenticated: false,
  isLoading: false,
  authKey: null,
  owner: null,
  projectGroup: null,
  solarProjects: null,
  credentials: ''
};

// TODO: `authenticated`, `authKey`, and `credentials` all provide very similar information.
// Once airlock is integrated, we should see if we can consolidate

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    authenticate(state, action) {
      state.authenticated = true;
      state.key = action.payload;
    },
    setLoadingForUserData(state, action) {
      state.isLoading = true;
    },
    saveUserData(state, action) {
      const {
        owner,
        projectGroup,
        solarProjects,
        credentials
      } = action.payload;
      state.owner = owner;
      state.projectGroup = projectGroup;
      state.solarProjects = solarProjects;
      state.credentials = credentials;
      state.isLoading = false;
    },

    deauthenticateAndClearUserData() {
      return { ...initialState };
    }
  }
});

export const {
  authenticate,
  setLoadingForUserData,
  saveUserData,
  deauthenticateAndClearUserData
} = userDataSlice.actions;
export default userDataSlice.reducer;
