// import { Routes, Route } from 'react-router';
import { ExpensesIncomes } from './ExpensesIncomes/ExpensesIncomes';
import Layout from './Layout/Layout';

export const App = () => {
  return (
    <>
      <Layout />
      <ExpensesIncomes />
    </>
  );
};
