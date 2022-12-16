// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, fetchUserFromLocal } from './app/authSlice';

// Modules Imports
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';

// Components Imports
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './components/HomePage'
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Promos } from './components/Promos';
import { Settings } from './components/Settings';


// Other Files Imports
import { BoilerPlateComponent } from './BoilerPlateComponent';
import * as ROUTES from './constants/routes';


// Styling Imports
import './assets/bulma.min.css';
import './assets/loyalty.css';
//import './assets/debug.css';

Amplify.configure({
  Auth: {
      mandatorySignIn: true,
      region: process.env.REACT_APP_AWS_COGNITO_REGION,
      userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_APP_CLIENT_ID
  }
});

function App() {
  const auth = useSelector(authStore);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("COMPONENT RENDERED: App");
}, [])

  useEffect(() => {
    dispatch(fetchUserFromLocal());
  }, [dispatch])

  useEffect(() => {
    if(auth.isAuthenticated){ 
      console.log("COMPONENT App: User already logged in, Route to Promos")
      navigate(ROUTES.PROMOS) 
    }
  }, [auth.isAuthenticated])

  return (
    <div className='app'>
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
  );
}

export default App;
