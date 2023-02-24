import { Routes, Route } from 'react-router';
import Layout from './Layout/Layout';
import HomePage from '../Pages/HomePage/HomePage';
import { PublicRoute } from './PublicRoute/PublicRoute';

export const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Layout />}>
          <Route
            index
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};
