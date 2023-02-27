import { Route, Routes } from 'react-router-dom';

import { ExpensesIncomes } from 'Pages/ExpensesIncomes/ExpensesIncomes';
import HomePage from 'Pages/HomePage/HomePage';
import { Header } from './Header/Header';
import { CurrentPeriod } from './CurrentPeriod/CurrentPeriod';
import { MobileProductForm } from './MobileProductForm/MobileProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogin, getIsRefreshing } from 'redux/auth/auth-selector';
import { useEffect } from 'react';
import { refresh } from 'redux/auth/auth-operations';
import Loader from 'shared/Loader/Loader';
// import PrivateRoute from 'routes/PrivateRoute/PrivateRoute';
// import RestrictedRoute from 'routes/RestrictedRoute/RestrictedRoute';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(getIsRefreshing);
  const isLogin = useSelector(getIsLogin);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  // To check authorization when reload page.
  // The second part (save authorization to localStorage) should be implemented when response from server is recieved
  // useEffect(() => {
  //  const auth = localStorage.get('auth');
  //  if (!isLogin && auth) {
  //     dispatch(setToAuthStorage(JSON.parse(auth)))
  //   }
  // }
  // }, [isLogin])

  const routers =
    isLogin || isRefreshing ? ( // Check if redirect needed
      <>
        <Route path="/" element={<ExpensesIncomes />} />
        <Route path="reports" element={<CurrentPeriod />} />
        <Route path="mobile-product-form" element={<MobileProductForm />} />
      </>
    ) : (
      <Route path="/" element={<HomePage />} /> // Home page it's Authorize page
    );

  return isRefreshing ? (
    <Loader height="100vh" />
  ) : (
    // <>
    //   <Header />
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         <RestrictedRoute component={HomePage} redirectTo="/transactions" />
    //       }
    //     />
    //     <Route
    //       path="/transactions"
    //       element={<PrivateRoute component={ExpensesIncomes} redirectTo="/" />}
    //       />
    //     <Route
    //       path="/reports"
    //       element={<PrivateRoute component={CurrentPeriod} redirectTo="/" />}
    //       />
    //     <Route
    //       path="/mobile-product-form"
    //       element={<PrivateRoute component={MobileProductForm} redirectTo="/" />}
    //     />
    //   </Routes>
    // </>

    <>
      <Header />
      <Routes>{routers}</Routes>
    </>
  );
};
