import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '@/api/api';

const initialState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addMatcher(authApi.endpoints.getUser.matchRejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(authApi.endpoints.editUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
  },
});

export const { getUser, getIsAuthChecked } = userSlice.selectors;
export const { setAuthChecked } = userSlice.actions;
