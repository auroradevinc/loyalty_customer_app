// Base Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore, updateActiveNav, saveCardDetails, verifyCardDetails } from '../../../app/appSlice';
import { customerStore } from '../../../app/customerSlice';
import { authStore, fetchUserFromLocal, setUpAuthState } from '../../../app/authSlice';

// Modules Imports
import { AddCard } from './AddCard';
import { AddAccoumtDetails } from './AddAccountDetails';
import { ConfirmAccount } from '../ConfirmAccount';
import { NavLink, useNavigate } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../../../constants/routes';

// Styling Imports
import './SignUp.css';

export function SignUp() {
    const auth = useSelector(authStore);
    const app = useSelector(appStore);
    const customer = useSelector(customerStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [addCardComplete, setAddCardComplete] = useState(false);
    const [showAddCardForm, setShowAddCardForm] = useState(false);

    const [addAccountDetailsComplete, setAddAccountDetailsComplete] = useState(false);
    const [showAddAccountDetailsForm, setShowAddAccountDetailsForm] = useState(false);
    const [showVerificationForm, setShowVerificationForm] = useState(false);

    useEffect(() => {
        console.log("COMPONENT RENDERED: SignUp");
    }, [])

    useEffect(() => {
        dispatch(updateActiveNav(ROUTES.SIGN_UP));
        dispatch(setUpAuthState());
        dispatch(fetchUserFromLocal());
        
        try {
            let query = window.location.search.substring(1);
            query = query.split('&');
            let card = {
                'id': query[0].split('=')[1],
                'cvc': query[1].split('=')[1],
                'fromURL': true // Helps to differentiate between the source of card information
            }
            console.log("COMPONENT SignUp: Card details present in URL, Saving Card Details");
            dispatch(saveCardDetails(card));
            dispatch(verifyCardDetails(card));
        }
        catch(e) {
            console.log("COMPONENT SignUp: Card details NOT present in URL");
        }
    }, [dispatch])

    useEffect(() => {
        if(auth.isAuthenticated){
            console.log("COMPONENT SignUp: User already logged in, Route to Promos");
            navigate(ROUTES.PROMOS) 
        }
    }, [auth.isAuthenticated])

    useEffect(() => {
        // Step 1: Add Card
        // AddCard rendered on default
        if(!app.hasCardDetailsSaved){
            console.log("COMPONENT SignUp: Render Step 1: Add Card");
            setShowAddCardForm(true);
            setShowAddAccountDetailsForm(false);
            setShowVerificationForm(false);
        }

        // Step 2: Add Account Details
        if(app.hasCardDetailsSaved && app.hasCardDetailsVerified && (app.hasCardDetailsSavedFromURL || addCardComplete)){
            console.log("COMPONENT SignUp: Render Step 2: Add Account Details");
            setShowAddCardForm(false);
            setShowAddAccountDetailsForm(true);
            setShowVerificationForm(false);
        }

        // Step 3: Verify Account
        if(auth.isSignedUp && customer.hasCustomerAddedToDB && addAccountDetailsComplete){
            console.log("COMPONENT SignUp: Render Step 3: Verify Account");
            setShowAddCardForm(false);
            setShowAddAccountDetailsForm(false);
            setShowVerificationForm(true);
        }
    }, [app.hasCardDetailsSaved, app.hasCardDetailsVerified, app.hasCardDetailsSavedFromURL, addCardComplete, auth.isSignedUp, customer.hasCustomerAddedToDB, addAccountDetailsComplete])

    return (
        <section className="bg-white bg-opacity-0 min-h-[70vh]">
            <div className="container px-4 mx-auto">
            <div className="max-w-lg mx-auto">

                <div className="mb-7 text-center">
                    <NavLink className="hidden mb-3 sm:inline-block" to={ROUTES.HOME_PAGE}>
                        <img className="h-24" src="./loyalty_logo.png" alt=""/>
                    </NavLink>
                    <h3 className="mb-1 text-2xl text-coolGray-900 md:text-3xl font-bold">Register your account</h3>
                    <p className="text-lg text-coolGray-500 font-medium">Jour our community</p>
                    <hr className='mt-2 mb-2'/>
                </div>

                {(showAddCardForm) ? <AddCard setAddCardComplete={setAddCardComplete}/> : ""}

                {(showAddAccountDetailsForm) ? <AddAccoumtDetails setAddAccountDetailsComplete={setAddAccountDetailsComplete} /> : ""}
                
                {(showVerificationForm) ? <ConfirmAccount /> : ""}

                <hr className='mb-2 mb-2'/>
                <p className="text-center">
                    <span className="text-xs font-medium text-coolGray-800">Already have an account?</span>
                    <NavLink className="inline-block text-xs ml-2 font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200 hover:underline transition-all" to={ROUTES.SIGN_IN}>Sign In</NavLink>
                </p>
            </div>
            </div>
        </section>
    );
}