import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, refresh } from './auth-operations';

export const initialState = {
  accessToken: null,
  refreshToken: null,
  sid: null,
  isLogin: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    [logIn.pending]: state => {
      state.isLogin = false;
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.sid = payload.sid;
      state.isLogin = true;
    },
    [logIn.rejected]: state => {
      state.isLogin = false;
    },

    [logOut.fulfilled]: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.sid = null;
      state.isLogin = false;
    },
    [refresh.pending]: state => {
      state.isLogin = false;
    },
    [refresh.fulfilled]: (state, { payload }) => {
      state.accessToken = payload.newAccessToken;
      state.refreshToken = payload.newRefreshToken;
      state.sid = payload.newSid;
      state.isLogin = true;
    },
    [refresh.rejected]: state => {
      state.isLogin = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.sid = null;
    },
  },
});

export const authReducer = authSlice.reducer;
