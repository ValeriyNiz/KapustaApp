import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, authToken } from 'API';
import { toast } from 'react-toastify';

const register = createAsyncThunk('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await API.post('auth/register', credentials);
    return data;
  } catch (error) {
    toast.error('Server error, please try again later');
    return rejectWithValue(error); 
  }
});

const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await API.post('auth/login', credentials);
    authToken.set(data.token);
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      toast.error('Server error, please try again later');
    } else {
      toast.error('Wrong email or password, please try again.');
    }
  }
});

const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await API.post('auth/logout');
    authToken.unset();
  } catch (error) {
    toast.error('Server error, please try again later');
    return false;
  }
});

const refresh = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const prevSid = state.auth.sid;
    const prevRefresh = state.auth.refreshToken;
    if (!prevRefresh || !prevSid) {
      return rejectWithValue('something went wrong');
    }
    try {
      const response = await API.post(
        '/auth/refresh',
        { sid: prevSid },
        { headers: { Authorization: `Bearer ${prevRefresh}` } }
      );

      authToken.set(response.data.newAccessToken);

      return response.data; 
    } catch (error) {
      authToken.unset();

      if (error.response && error.response.status !== 401) { 
        toast.error('We got an error! Dont worry and try again.');
      }

      return rejectWithValue('something went wrong');
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
      console.log('balance in operations', balance);
      const { data } = await API.patch('auth/user/balance', balance);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { register, logIn, logOut, refresh, googleAuth, setBalance };
