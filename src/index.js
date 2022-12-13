// Base Imports
import React from 'react';

// Styling Imports
import './index.css';

// Modules Imports
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// Components Imports
import App from './App';

// Other File Imports
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
