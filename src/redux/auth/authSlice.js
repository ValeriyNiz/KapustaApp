import { createSlice } from '@reduxjs/toolkit';
import { authToken } from 'API';
import {
  logIn,
  logOut,
  refresh,
  setBalance,
  register,
} from './auth-operations';

export const initialState = {
  user: {
    email: '',
    balance: 'null',
  },
  isLoginApiDone: false,
  accessToken: null,
  isLogin: false,
  isRefreshing: false,
  isLoading: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeBalance(state, { payload }) {
      state.user.balance = payload;
    },
    setGoogleAuth(state, { payload }) {
      const { email, token, balance } = payload;
      authToken.set(token);
      state.user = { email: email, balance: balance };
      state.isLoginApiDone = true;
      state.accessToken = token;
      state.isLoading = false;
      state.isLogin = true;
    },
  },
  extraReducers: {
    [register.pending]: state => {
      state.isLoading = true;
      state.message = '';
    },
    [register.fulfilled]: (state, { payload }) => {
      state.user.email = payload.user;
      state.isLoading = false;
      state.message = 'Verify your email, please.';
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
    [setBalance.fulfilled]: (state, { payload: { newUserBalance } }) => {
      state.user.balance = newUserBalance;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { changeBalance, setGoogleAuth } = authSlice.actions;
