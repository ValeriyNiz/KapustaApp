import { Route, Routes } from 'react-router-dom';

import { ExpensesIncomes } from 'Pages/ExpensesIncomes/ExpensesIncomes';
import HomePage from 'Pages/HomePage/HomePage';
import { Header } from './Header/Header';
import { CurrentPeriod } from './CurrentPeriod/CurrentPeriod';
import { MobileProductForm } from './MobileProductForm/MobileProductForm';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/auth-selector';

export const App = () => {
  const isLogin = useSelector(getIsLoggedIn);

  // To check authorization when reload page.
  // The second part (save authorization to localStorage) should be implemented when response from server is recieved
  // useEffect(() => {
  //  const auth = localStorage.get('auth');
  //  if (!isLogin && auth) {
  //     dispatch(setToAuthStorage(JSON.parse(auth)))
  //   }
  // }
  // }, [isLogin])

  const routers = isLogin ? ( // Check if redirect needed
    <>
      <Route path="/" element={<ExpensesIncomes />} />
      <Route path="reports" element={<CurrentPeriod />} />
      <Route path="mobile-product-form" element={<MobileProductForm />} />
    </>
  ) : (
    <Route path="/" element={<HomePage />} /> // Home page it's Authorize page
  );

  return (
    <>
      <Header />
      <Routes>{routers}</Routes>
    </>
  );
};
