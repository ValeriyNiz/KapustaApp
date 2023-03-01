import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, authToken } from 'API';

const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await API.post('auth/register', credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await API.post('auth/login', credentials);
      authToken.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await API.post('auth/logout');
      authToken.unset();
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  }
);

const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const { accessToken } = thunkAPI.getState().auth;

  if (!accessToken) {
    return thunkAPI.rejectWithValue('No valid token');
  }
  authToken.set(accessToken);

  try {
    const { data } = await API.get('auth/users/current');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.statusText);
  }
});

const setBalance = createAsyncThunk(
  'auth/setBalance',
  async (balance, { rejectWithValue }) => {
    try {
      const { data } = await API.patch('auth/users/balance', balance);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { register, logIn, logOut, refresh, setBalance };
