import { Header } from '../Header/Header';
import { Outlet } from 'react-router';
import HomePage from 'Pages/Homepage/Homepage';

import { CurrentPeriod } from 'components/CurrentPeriod/CurrentPeriod';
import { ExpensesIncomes } from 'components/ExpensesIncomes/ExpensesIncomes';

const Layout = () => {
  return (
    <>
      <Header />
      <HomePage />
      <Outlet />
      <ExpensesIncomes>
        <CurrentPeriod />
      </ExpensesIncomes>
    </>
  );
};

export default Layout;
