import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, authToken } from 'API';
import { toast } from 'react-toastify';

const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await API.post('auth/register', credentials);
    return data;
  } catch (error) {
    toast.error('Server error, please try again later');
  }
});

const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await API.post('auth/login', credentials);
    authToken.set(data.accessToken);
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      toast.error('Server error, please try again later');
    }
    if (error.response.status !== 401) {
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
      const { data } = await API.post(
        '/auth/refresh',
        { sid: prevSid },
        {
          headers: {
            Authorization: `Bearer ${prevRefresh}`,
          },
        }
      );

      authToken.set(data.newAccessToken);
      return data;
    } catch (error) {
      authToken.unset();
      if (error.response.status !== 401) {
        toast.error('We got an error! Dont worry and try again.');
      }
      return rejectWithValue('something went wrong');
    }
  }
);

export { register, logIn, logOut, refresh };
