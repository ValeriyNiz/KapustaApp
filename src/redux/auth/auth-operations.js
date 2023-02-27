import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, authToken } from 'API';
// import { toast } from 'react-toastify';

const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await API.post('auth/register', credentials);
      // console.log('data in register: ', data);
      return data;
    } catch (error) {
      // console.log('error from register: ', error);
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
      // console.log('data in login', data);
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
  // console.log('reduxState ', thunkAPI.getState().auth);
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

const googleAuth = createAsyncThunk(
  'auth/googleAuth',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post('/auth/google', credentials);
      authToken.set(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setBalance = createAsyncThunk(
  'auth/setBalance',
  async (balance, { rejectWithValue }) => {
    try {
      // console.log('balance in operations', balance);
      const { data } = await API.patch('auth/users/balance', balance);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export {
  register,
  logIn,
  logOut,
  refresh,
  googleAuth,
  setBalance,
  // fetchBalance,
};
