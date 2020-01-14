/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// This is a slice created using the Redux Toolkits.
// It sets up both the reducers and actions for a particular slice of the redux store
//
// The community slice stores the array of community announcements

const initialState = { isLoading: false, announcements: [] };

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    fetchAnnouncements(state) {
      state.isLoading = true;
    },
    saveAnnouncements(state, action) {
      state.isLoading = false;
      action.payload.forEach(a => {
        state.announcements.push(a);
      });
    },
    clearAnnouncements() {
      return { ...initialState };
    }
  }
});

export const {
  fetchAnnouncements,
  saveAnnouncements,
  clearAnnouncements
} = communitySlice.actions;
export default communitySlice.reducer;
