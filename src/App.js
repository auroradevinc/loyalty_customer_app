// Base Imports
import React from 'react';

// Modules Imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components Imports

// Other Files Imports
import { BoilerPlateComponent } from './BoilerPlateComponent';

// Styling Imports
import './App.css';
import logo from './logo.svg';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BoilerPlateComponent/>
  },
]);

function App() {
  return (
    <div className="App">
      Loyalty Customer App
      <BoilerPlateComponent/>

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
