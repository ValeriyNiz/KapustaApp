export const getTotalReportObject = state => state.report.totalReportObject;
export const getSearchedMonth = state => state.report.searchedMonth;
export const getSearchedYear = state => state.report.searchedYear;
export const getDifference = state => state.report.difference;
export const getTotalIncome = state =>
  state.report.totalReportObject.income.totalSum;
export const getTotalExpenses = state =>
  state.report.totalReportObject.expenses.totalSum;
export const getAllTransactions = state => state.report.allTransactions;
export const getChoice = state => state.report.choice;
