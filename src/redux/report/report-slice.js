import { createSlice } from '@reduxjs/toolkit';
import { fetchFullStatistics } from './report-operations';
export const initialState = {
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
    // [fetchFullStatistics.rejected](state, action) {},
  },
 });
export const {
  setSearchedMonth,
  setSearchedYear
} = reportSlice.actions;
export const reportReducer = reportSlice.reducer;
