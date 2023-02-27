import { API } from 'API';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFullStatistics = createAsyncThunk(
  'report/fetchFullStatistics',
  async (params, rejectWithValue) => {
    try {
      const { year, currentMonth } = params;

      const data = await API.post('/transaction/fullStatistics', {
        year,
        currentMonth,
      });
      //console.log('data', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'report/addTransaction',
  async (inputData, rejectWithValue) => {
    try {
      let res = null;
      if (!inputData.income) {
        res = await API.post('/transactions/expenses', inputData);
      } else {
        res = await API.post('/transactions/income', inputData);
      }
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'report/deleteTransaction',
  async (id, rejectWithValue) => {
    try {
      const res = await API.delete(`/transactions/${id}`);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'report/fetchTransactions',
  async (_, rejectWithValue) => {
    try {
      const res = await API.get(`/transactions`);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
