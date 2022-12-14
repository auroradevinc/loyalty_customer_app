// Base Imports
import React from 'react';

// Modules Imports
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// Components Imports
import App from './App';

// Other Files Imports
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

// Styling Imports
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App/>
    {/* <Provider store={store}>
    </Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
