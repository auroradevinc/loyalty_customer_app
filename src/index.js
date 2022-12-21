// React Imports
import React from 'react';
import { createRoot } from 'react-dom/client';

// Redux Imports
import { Provider } from 'react-redux';

// Modules Imports
import { BrowserRouter } from 'react-router-dom';

// Components Imports
import App from './App';

// Other Files Imports
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

// Styling Imports
import './index.css';
import './tailwind.css';
//import './assets/bulma/css/bulma.min.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  //<React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
