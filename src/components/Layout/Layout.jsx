import { Header } from 'components/Header/Header';
import { Outlet } from 'react-router';
import { CurrentPeriod } from 'components/CurrentPeriod/CurrentPeriod';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <CurrentPeriod/>
    </>
  );
};

export default Layout;
