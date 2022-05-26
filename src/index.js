import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./store";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

