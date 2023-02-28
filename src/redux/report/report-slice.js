import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFullStatistics,
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  // setChoice,
} from './report-operations';
export const initialState = {
  allTransactions: [],
  // choice: 'expenses',
  totalReportObject: null,
  searchedMonth: 'March',
  searchedYear: 2023,
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setSearchedMonth: (state, action) => {
      state.searchedMonth = action.payload;
    },
    setSearchedYear: (state, action) => {
      state.searchedYear = action.payload;
    },
  },
  extraReducers: {
    [fetchFullStatistics.fulfilled](state, action) {
      // console.log('HHHH');
      // console.log('dataa', action.payload.data);
      state.totalReportObject = action.payload.data;
    },
    [fetchTransactions.fulfilled](state, action) {
      state.allTransactions = action.payload.data;
    },
    [addTransaction.fulfilled](state, action) {
      state.error = null;
      state.allTransactions.push(action.payload.data);
    },
    [addTransaction.rejected](state, action) {
      console.log('not allowed transaction');
      state.error = action.payload;
    },
    [deleteTransaction.fulfilled](state, action) {
      state.allTransactions = state.allTransactions.filter(
        t => t._id !== action.payload
      );
    },
    // [setChoice]: (state, action) => {
    //   state.choice = action.payload.choice;
    // },
  },
});
export const { setSearchedMonth, setSearchedYear } = reportSlice.actions;
export const reportReducer = reportSlice.reducer;
