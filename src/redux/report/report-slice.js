import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFullStatistics,
  fetchTransactions,
  addTransaction,
  deleteTransaction,
} from './report-operations';
export const initialState = {
  allTransactions: [],
  totalReportObject: null,
  searchedMonth: 'February',
  searchedYear: 2023,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers:{
    setSearchedMonth: (state, action) => {
      state.searchedMonth = action.payload;
    },
    setSearchedYear: (state, action) => {
      state.searchedYear = action.payload;
    },
  },
  extraReducers: {
    
    // [fetchFullStatistics.pending](state, action) {},
    [fetchFullStatistics.fulfilled](state, action) {
      console.log("HHHH")
      console.log("dataa",action.payload.data)
      state.totalReportObject = action.payload.data;
    },
    [fetchTransactions.fulfilled](state, action) {
      state.allTransactions = action.payload;
    },
    [addTransaction.fulfilled](state, action) {
      state.allTransactions.push(action.payload);
    },
    [deleteTransaction.fulfilled](state, action) {
      state.allTransactions.filter(t => t._id !== action.payload.id);
    },
    // [fetchFullStatistics.rejected](state, action) {},
  },
});
export const { setSearchedMonth, setSearchedYear } = reportSlice.actions;
export const reportReducer = reportSlice.reducer;
