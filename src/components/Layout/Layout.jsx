import { Header } from '../Header/Header';
import { Outlet } from 'react-router';

import { CurrentPeriod } from 'components/CurrentPeriod/CurrentPeriod';
import { ExpensesIncomes } from 'components/ExpensesIncomes/ExpensesIncomes';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ExpensesIncomes>
        <CurrentPeriod />
      </ExpensesIncomes>
    </>
  );
};

export default Layout;
