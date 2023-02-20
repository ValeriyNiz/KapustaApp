import { Header } from 'components/Header/Header';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
