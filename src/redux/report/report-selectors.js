export const getTotalReportObject = state => state.report.totalReportObject;
export const getSearchedMonth = state => state.report.searchedMonth;
export const getSearchedYear = state => state.report.searchedYear;
export const getDifference = state => state.report.difference;
export const getTotalIncome = state =>
  state.report.totalReportObject.income.totalSum;
export const getTotalExpenses = state =>
  state.report.totalReportObject.expenses.totalSum;
export const getBalance = state => state.auth.user.balance;
