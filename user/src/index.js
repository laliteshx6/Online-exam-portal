import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
document.addEventListener('contextmenu', event => event.preventDefault());
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <>
    <Provider store={store}>
      <App />

    </Provider>
  </>
);

reportWebVitals();
