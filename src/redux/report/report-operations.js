import { API } from 'API';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFullStatistics = createAsyncThunk(
  'report/fetchFullStatistics',
  async (params, rejectWithValue) => {
    try {
      const { year, currentMonth, userId } = params;
      
      const data = await API.post('/fullStatistics', {
        year,
        currentMonth,
        userId,
      });
      console.log('data', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
