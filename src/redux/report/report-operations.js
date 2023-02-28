import { API } from 'API';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setBalance } from 'redux/auth/auth-operations';

export const fetchFullStatistics = createAsyncThunk(
  'report/fetchFullStatistics',
  async (params, rejectWithValue) => {
    try {
      const { year, currentMonth } = params;

      const data = await API.post('/transactions/fullStatistics', {
        year,
        currentMonth,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'report/addTransaction',
  async (inputData, { rejectWithValue, getState, dispatch }) => {
    const { income, sum } = inputData;
    const balance = +getState().auth.user.balance;

    const updatedBalance = income ? balance + +sum : balance - sum;

    if (updatedBalance < 0) {
      return rejectWithValue("You don't have enough money");
    }

    dispatch(setBalance({ balance: updatedBalance }));

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

  async (credentials, { rejectWithValue, getState, dispatch }) => {
    const { id, sum, income } = credentials;
    const balance = +getState().auth.user.balance;
    try {
      await API.delete(`/transactions/${id}`);
      const updatedBalance = income ? balance - sum : balance + sum;
      dispatch(setBalance({ balance: updatedBalance }));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'report/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/transactions');
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
