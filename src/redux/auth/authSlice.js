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
  accessToken: null,
  refreshToken: null,
  sid: null,
  isLogin: false,
  isLoading: false,
  // error: null,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: {
    [register.pending]: state => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.user.email = payload.user;
      state.message = 'Verify your email, please.';
    },
    [register.rejected]: (state, { payload }) => {
      state.isLogin = false;
      state.message = payload;
    },
    [logIn.pending]: state => {
      state.isLogin = false;
      state.message = '';
    },
    [logIn.fulfilled]: (state, { payload }) => {
      // localStorage.setItem('auth', JSON.stringify(payload));
      state.accessToken = payload.token;
      state.refreshToken = payload.refreshToken;
      state.sid = payload.sid;
      state.isLogin = true;
    },
    [logIn.rejected]: (state, { payload }) => {
      state.isLogin = false;
      state.message = payload;
    },
    [logOut.fulfilled]: state => ({
      ...state,
      accessToken: null,
      refreshToken: null,
      sid: null,
      isLogin: false,
    }),
    [refresh.pending]: state => ({ ...state, isLogin: false }),
    [refresh.fulfilled]: (state, { payload }) => ({
      ...state,
      accessToken: payload.newAccessToken,
      refreshToken: payload.newRefreshToken,
      sid: payload.newSid,
      isLogin: true,
    }),
    [refresh.rejected]: state => ({
      ...state,
      isLogin: false,
      accessToken: null,
      refreshToken: null,
      sid: null,
    }),
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
      state.isLoading = false;
    },
  },
});

export const authReducer = authSlice.reducer;
