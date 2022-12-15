// Base Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Modules Imports
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';

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

  useEffect(() => {
    console.log(Amplify);
    async function fetchLocalStorageData() {
      console.log("Trying to Fetch User Data from local storgae if exists");
      try {
          const session = await Auth.currentSession();
          const user = await Auth.currentAuthenticatedUser();
          console.log('- User Fetched',session, user);
      }
      catch (err){
          console.log('- Error Fetching data from local storage', err);
      }
    }
    fetchLocalStorageData();
  }, [])

  return (
    <BrowserRouter>
          <Navbar/> 

          <Routes>
          <Route exact path={ROUTES.HOME_PAGE} element={<HomePage/>}></Route>
            <Route exact path={ROUTES.SIGN_IN} element={<SignIn/>}></Route>
            <Route exact path={ROUTES.SIGN_UP} element={<SignUp/>}></Route>
            <Route exact path={ROUTES.PROMOS} element={<Promos/>}></Route>
            <Route exact path={ROUTES.SETTINGS} element={<Settings/>}></Route>
          </Routes>
        
          {/* <Footer/> */}

    </BrowserRouter>
  );
}

export default App;
