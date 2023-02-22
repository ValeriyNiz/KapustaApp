import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3030/api/transaction';
export const fetchFullStatistics = createAsyncThunk(
  'report/fetchFullStatistics',
  async ({year,currentMonth}) => {
    const response = await axios.post('/fullStatistics', {
        year,
        currentMonth,
        userId: '2',
      },

    );
    console.log('response', response);
    return response;
  }
);
