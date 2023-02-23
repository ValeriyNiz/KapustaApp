import { API } from 'API';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFullStatistics = createAsyncThunk(
  'report/fetchFullStatistics',
  async ({ year, currentMonth }, rejectWithValue) => {
    try {
      const data = await API.post('/fullStatistics', {
        year,
        currentMonth,
        userId: '2',
      });
      console.log('data', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
