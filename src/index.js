import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={<div>...loading</div>} persistor={persistor}>
      <BrowserRouter basename="ValeriyNiz/KapustaApp">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
