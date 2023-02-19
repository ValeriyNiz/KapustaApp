import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  accessToken: null,
  refreshToken: null,
  sid: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
