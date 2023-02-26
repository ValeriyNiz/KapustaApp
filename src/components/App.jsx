import { Route, Routes } from 'react-router-dom';

import { ExpensesIncomes } from 'Pages/ExpensesIncomes/ExpensesIncomes';
import HomePage from 'Pages/HomePage/HomePage';
import { Header } from './Header/Header';
import { CurrentPeriod } from './CurrentPeriod/CurrentPeriod';
// import { MobileProductForm } from './MobileProductForm/MobileProductForm';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="expenses" element={<ExpensesIncomes />} />
        <Route path="expenses/reports" element={<CurrentPeriod />} />
        {/* <Route path="/" element={<MobileProductForm />} /> */}
      </Routes>
    </>
  );
};
