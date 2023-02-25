import { createSlice } from '@reduxjs/toolkit';
import {
  logIn,
  logOut,
  refresh,
  googleAuth,
  setBalance,
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
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    [logIn.pending]: state => {
      state.isLogin = false;
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.accessToken = payload.token;
      state.refreshToken = payload.refreshToken;
      state.sid = payload.sid;
      state.isLogin = true;
    },
    [logIn.rejected]: state => {
      state.isLogin = false;
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
