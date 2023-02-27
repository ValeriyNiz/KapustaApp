import { createSlice } from '@reduxjs/toolkit';
import {
  logIn,
  logOut,
  refresh,
  googleAuth,
  setBalance,
  register,
} from './auth-operations';

export const initialState = {
  user: {
    email: '',
    balance: null,
  },
  isLoginApiDone: false,
  accessToken: null,
  isLogin: false,
  isRefreshing: false,
  isLoading: false,
  message: '',
  // refreshToken: null,
  // sid: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: {
    [register.pending]: state => {
      state.isLoading = true;
      state.message = '';
    },
    [register.fulfilled]: (state, { payload }) => {
      state.user.email = payload.user;
      state.isLoading = false;
      state.message = 'Verify your email, please.';
      // state.refreshToken = payload.refreshToken;
      // state.sid = payload.sid;
    },
    [register.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isLogin = false;
      state.message = payload;
    },
    [logIn.pending]: state => {
      state.isLogin = false;
      state.isLoading = true;
      state.message = '';
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.user = { email: payload.email, balance: payload.balance };
      state.isLoginApiDone = true;
      state.accessToken = payload.token;
      state.isLoading = false;
      state.isLogin = true;
    },
    [logIn.rejected]: (state, { payload }) => {
      state.isLoginApiDone = true;
      state.isLogin = false;
      state.isLoading = false;
      state.message = payload;
    },

    [logOut.fulfilled]: state => {
      state.user = { email: '', balance: null };
      state.accessToken = null;
      state.isLogin = false;
      state.message = '';
    },

    [refresh.pending]: state => {
      state.isRefreshing = true;
    },
    [refresh.fulfilled]: (state, { payload }) => {
      state.isLoginApiDone = true;
      state.user = payload;
      state.isLogin = true;
      state.isRefreshing = false;
    },
    [refresh.rejected]: state => {
      state.isLoginApiDone = true;
      state.isRefreshing = false;
    },

    [googleAuth.fulfilled](state, action) {
      const { user, accessToken, refreshToken, sid } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.sid = sid;
      state.isLogin = true;
    },

    [setBalance.fulfilled]: (state, { payload }) => {
      state.user.balance = payload.newUserBalance;
    },
  },
});

export const authReducer = authSlice.reducer;
