// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore } from './app/appSlice';
import { cardStore, getCardFromDB } from './app/cardSlice';
import { customerStore, getCustomerFromDB } from './app/customerSlice';
import { authStore, fetchUserFromLocal } from './app/authSlice';
import { promoStore, getPromoFromDB } from './app/promoSlice';

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
import { Card } from './components/Card';
import { InviteFriend } from './components/InviteFriend';
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
  const promo = useSelector(promoStore);
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
    // if(auth.isAuthenticated && app.nav.active_link === ROUTES.HOME_PAGE) { 
    //   console.log("COMPONENT App: User already logged in, Route to Promos");
    //   navigate(ROUTES.PROMOS);
    // }
    if(!auth.isAuthenticated && app.nav.active_link && (app.nav.active_link !== ROUTES.SIGN_IN || app.nav.active_link !== ROUTES.SIGN_UP)){
      console.log("COMPONENT App: User Not logged in, Trying to access protected routes, Routing to SignIn/SignUp page", app.nav.active_link);
      navigate(ROUTES.SIGN_IN);
    }

    if(!auth.userSession.jwtToken) {
      console.log("COMPONENT App: JWT Token not available");
      return;
    }

    if(auth.isAuthenticated && !customer.hasCustomerExtractedFromDB) { 
      console.log("COMPONENT App: Customer Data from DB unavailable, Get Customer Data from DB");
      let data = {
          customer: {
              id: auth.user.sub,
          },
          session: {
            jwtToken: auth.userSession.jwtToken,
          }
      };
      dispatch(getCustomerFromDB(data));
    }

    if(customer.hasCustomerExtractedFromDB && !card.hasCardExtractedFromDB) { 
        console.log("COMPONENT App: Customer Data from DB available, Card Data from db unavailable, Get Card Data from DB");
        let data = {
            customer: {
                id: customer.customer.customer_id,
            },
            session: {
              jwtToken: auth.userSession.jwtToken,
            }
        };
        dispatch(getCardFromDB(data));
    }

    if(card.hasCardExtractedFromDB && !promo.hasExtractedPromoFromDB) {
        console.log("COMPONENT App: Card Data from db available, Get Promo Data from DB");
        let data = {
            card: {
                id: card.card.card_id,
            },
            session: {
              jwtToken: auth.userSession.jwtToken,
            }
        };
        dispatch(getPromoFromDB(data));
    }
  }, [app.nav.active_link, auth.isAuthenticated, auth.userSession.jwtToken, customer.hasCustomerExtractedFromDB, card.hasCardExtractedFromDB])

  return (
    <div id='wrapper' style={{ backgroundImage: "url('./pattern-white.svg')", backgroundPosition: "center", backgroundRepeat: "repeat" }}>
      <div id='app' className='w-11/12 sm:w-10/12 lg:9/12 max-w-7xl mx-auto scroll-smooth hover:scroll-auto transition-all'>

        <Navbar/>

        <Routes>
          <Route exact path={ROUTES.HOME_PAGE} element={<HomePage/>}></Route>
          <Route exact path={ROUTES.SIGN_IN} element={<SignIn/>}></Route>
          <Route exact path={ROUTES.SIGN_UP} element={<SignUp/>}></Route>
          <Route exact path={ROUTES.PROMOS} element={<Promos/>}></Route>
          <Route exact path={ROUTES.CARD} element={<Card/>}></Route>
          <Route exact path={ROUTES.INVITE_FRIEND} element={<InviteFriend/>}></Route>
          <Route exact path={ROUTES.SETTINGS} element={<Settings/>}></Route>
        </Routes>

        <Footer/>

      </div>
    </div>
  );
}

export default App;
