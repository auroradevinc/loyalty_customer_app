// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore } from './app/appSlice';
import { cardStore, getCardFromDB } from './app/cardSlice';
import { customerStore, getCustomerFromDB } from './app/customerSlice';
import { authStore, fetchUserFromLocal } from './app/authSlice';

// Modules Imports
import { Route, Routes, useNavigate } from 'react-router-dom';

// Components Imports
import { Navbar } from './components/Navbar';
import { Navbar_test } from './components/Navbar_test';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { SignIn } from './components/Auth/SignIn/SignIn';
import { SignUp } from './components/Auth/SignUp/SignUp';
import { Promos } from './components/Promos';
import { Settings } from './components/Settings';


// Other Files Imports
import { BoilerPlateComponent } from './BoilerPlateComponent';
import * as ROUTES from './constants/routes';

// Styling Imports
import './assets/loyalty.css';
//import './assets/debug.css';

function App() {
  const auth = useSelector(authStore);
  const app = useSelector(appStore);
  const card = useSelector(cardStore);
  const customer = useSelector(customerStore);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("COMPONENT RENDERED: App");
  }, [])

  useEffect(() => {
    console.log("COMPONENT App: Attempt Fetch User from Local");
    dispatch(fetchUserFromLocal());
  }, [dispatch])

  useEffect(() => {
    // App.js controls rounting to promos only if the current page is the home page
    // SignIn & SignUp page handles routing when authenticated successfully
    if(auth.isAuthenticated && app.nav.active_link === ROUTES.HOME_PAGE) { 
      console.log("COMPONENT App: User already logged in, Route to Promos");
      navigate(ROUTES.PROMOS);
    }
  }, [auth.isAuthenticated])

  return (
    <div id='wrapper' style={{ backgroundImage: "url('./pattern-white.svg')", backgroundPosition: "center" }}>
      <div id='app' className='w-11/12 sm:w-10/12 lg:9/12 max-w-7xl mx-auto'>

        <Navbar/>

        <Routes>
          <Route exact path={ROUTES.HOME_PAGE} element={<HomePage/>}></Route>
          <Route exact path={ROUTES.SIGN_IN} element={<SignIn/>}></Route>
          <Route exact path={ROUTES.SIGN_UP} element={<SignUp/>}></Route>
          <Route exact path={ROUTES.PROMOS} element={<Promos/>}></Route>
          <Route exact path={ROUTES.SETTINGS} element={<Settings/>}></Route>
        </Routes>

        <Footer/>

      </div>
    </div>
  );
}

export default App;
