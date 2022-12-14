// Base Imports
import React from 'react';


// Modules Imports
import {BrowserRouter, Route, Routes } from "react-router-dom";

// Components Imports
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Promos } from './components/Promos';
import { Settings } from './components/Settings';


// Other Files Imports
import { BoilerPlateComponent } from './BoilerPlateComponent';
import * as ROUTES from './constants/routes';


// Styling Imports
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className={"navbar-container"}>
          <Navbar/>
        </header>

        {/* <BoilerPlateComponent/> */}

        <main id={"main-container"}>
          <Routes>
            <Route exact path={ROUTES.SIGN_IN} element={<SignIn/>}></Route>
            <Route exact path={ROUTES.SIGN_UP} element={<SignUp/>}></Route>
            <Route exact path={ROUTES.PROMOS} element={<Promos/>}></Route>
            <Route exact path={ROUTES.SETTINGS} element={<Settings/>}></Route>
          </Routes>
        </main>

          <footer>
            <Footer/>
          </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
