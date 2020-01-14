/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// This is a slice created using the Redux Toolkits.
// It sets up both the reducers and actions for a particular slice of the redux store
//
// The user data slice stores all authentication and user information

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {},
  reducers: {
    // this action saves all the basic user data when the user first logs in
    authenticateAndSave(state, action) {
      const { key, owner, person, userLogin } = action.payload;
      state.key = key;
      state.owner = owner;
      state.person = person;
      state.userLogin = userLogin;
    }
  }
});

export const { saveUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
