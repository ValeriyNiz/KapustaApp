import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, refresh, googleAuth } from './auth-operations';

export const initialState = {
  user: {
    email: '',
  },
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
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.sid = action.payload.sid;
      state.isLogin = true;
    },
  },
});


export const authReducer = authSlice.reducer;
