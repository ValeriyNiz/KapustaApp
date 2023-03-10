import { Navigate, Route, Routes } from 'react-router-dom';

import { ExpensesIncomes } from 'Pages/ExpensesIncomes/ExpensesIncomes';
import AuthPage from 'Pages/AuthPage/AuthPage';
import { Header } from './Header/Header';
import { CurrentPeriod } from './CurrentPeriod/CurrentPeriod';
import { MobileProductForm } from './MobileProductForm/MobileProductForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsLogin,
  getIsLoginApiDone,
  getIsRefreshing,
} from 'redux/auth/auth-selector';
import { useEffect } from 'react';
import { refresh } from 'redux/auth/auth-operations';
import Loader from 'shared/Loader/Loader';
import { Page404 } from 'Pages/Page404/Page404';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(getIsRefreshing);
  const isLoginApiDone = useSelector(getIsLoginApiDone);
  const isLogin = useSelector(getIsLogin);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  const routers = isLogin ? (
    <>
      <Route path="/" element={<ExpensesIncomes />} />
      <Route path="reports" element={<CurrentPeriod />} />
      <Route path="mobile-product-form" element={<MobileProductForm />} />
      <Route path="*" element={<Page404 />} />
    </>
  ) : (
    <>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  );

  return isRefreshing ? (
    <Loader height="100vh" />
  ) : (
    <>
      <Header />
      {isLoginApiDone ? <Routes>{routers}</Routes> : null}
    </>
  );
};
