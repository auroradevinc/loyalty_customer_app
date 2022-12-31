// Base Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore, updateActiveNav, saveSignUpDetails, saveCardDetails } from '../app/appSlice';
import { customerStore, addCustomerToDB } from '../app/customerSlice';
import { authStore, fetchUserFromLocal, setUpAuthState, signUp } from '../app/authSlice';

// Modules Imports
import { AddCard } from './AddCard';
import { ConfirmAccount } from './ConfirmAccount';
import { NavLink, useNavigate } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './SignUp.css';

export function SignUp() {
    const auth = useSelector(authStore);
    const app = useSelector(appStore);
    const customer = useSelector(customerStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();

    const [cardDetails, setCardDetails] = useState(null);

    const [showAddCardForm, setShowAddCardForm] = useState(true);
    const [showDetailsForm, setShowDetailsForm] = useState(false);
    const [showVerificationForm, setShowVerificationForm] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [signUpError, setSignUpError] = useState("");

    useEffect(() => {
        console.log("COMPONENT RENDERED: SignUp");
        dispatch(updateActiveNav(ROUTES.SIGN_UP));
        
        let query = new URLSearchParams(window.location.search);
        setCardDetails({
            'id': query.get('card_id'),
            'cvc': query.get('card_cvc')
        });
    }, [])

    useEffect(() => {
        dispatch(fetchUserFromLocal());
    }, [dispatch])

    useEffect(() => {
        if(cardDetails){ dispatch(saveCardDetails(cardDetails)); }
    }, [cardDetails])

    useEffect(() => {
        if(auth.hasLocalFetched && !auth.isAuthenticated){
            dispatch(setUpAuthState());
            setShowAddCardForm(true);
            setShowDetailsForm(false);
            setShowVerificationForm(false);
            setEmailError("");
            setPhoneError("");
            setPasswordError("");
            setNameError("");
            setSignUpError("");
        }
    },[auth.hasLocalFetched])

    useEffect(() => {
        if(auth.isSignedUp && customer.isCustomerAddedToDB){ //#1 SignUp & Add to DB
            if(!app.hasCardDetails){ //#2 Get Card ID
                console.log("COMPONENT SignUp: User signed up, Customer added to DB, Card not saved, Toggle AddCard");
                setShowDetailsForm(false);
                setShowAddCardForm(true);
                setShowVerificationForm(false);
            }
            if(app.hasCardDetails && !auth.hasConfirmed){ //#3 Confirm User
                console.log("COMPONENT SignUp: User signed up, Customer added to DB, Card saved, User not confirmed, Toggle Verification");
                setShowDetailsForm(false);
                setShowAddCardForm(false);
                setShowVerificationForm(true);
            }
        }
    }, [auth.isSignedUp, auth.hasConfirmed, customer.isCustomerAddedToDB, app.hasCardDetails])

    useEffect(() => {
        if(auth.isSignedUp && (auth.user && auth.user.userSub) && app.hasCardDetails && app.hasSignUpDetails){
            console.log("COMPONENT SignUp: User signed up, Add to Customer DB");
            let data = {
                card: {
                    id: app.card.id,
                },
                customer: {
                    id: auth.user.userSub,
                    name: app.auth.signUp.name,
                    email: app.auth.signUp.email,
                    phone: app.auth.signUp.phone,
                }
            }
            dispatch(addCustomerToDB(data));
        }
    }, [auth.isSignedUp, auth.user, app.hasSignUpDetails, app.hasCardDetails])

    useEffect(() => {
        if(auth.isAuthenticated){
            console.log("COMPONENT SignUp: User already logged in, Route to Promos");
            navigate(ROUTES.PROMOS) 
        }
    }, [auth.isAuthenticated])

    useEffect(() => {
        if(auth.authError && auth.authError.toLowerCase().includes('email')){ setEmailError(auth.authError) }
        if(auth.authError && auth.authError.toLowerCase().includes('phone')){ setPhoneError(auth.authError) }
        if(auth.authError && auth.authError.toLowerCase().includes('password')){ setPasswordError(auth.authError) }
        if(auth.authError && auth.authError.toLowerCase().includes('name')){ setNameError(auth.authError) }
        if(auth.authError && !auth.authError.toLowerCase().includes('no current user')) { setSignUpError(auth.authError) } // // No Current User: Error when fetchUserFromLocal does not return a user
    }, [auth.authError])

    let formSubmitHandler = (event) => {
        event.preventDefault();

        let email = emailRef.current.value.toLowerCase();
        let phone = (phoneRef && phoneRef.current.value && (phoneRef.current.value.length === 10)) ? `+1${phoneRef.current.value}` : null;
        let password = passwordRef.current.value;
        let name = nameRef.current.value;
        // capitalize first letter of each word in the name
        name = name.split(' ').map(elem => elem[0].toUpperCase()+ elem.slice(1)).join(' ');
        
        console.log(`COMPONENT SignUp: SignUp form Submission`);
        //console.log(`COMPONENT SignUp: SignUp form Submission. Email: ${email}, Phone: ${phone}, Password: ${password}, Name: ${name}`);

        dispatch(signUp({email, phone, password, name}));
        dispatch(saveSignUpDetails({email, phone, name}));
    }

    return (
        <section className="bg-white bg-opacity-0 min-h-[70vh]">
            <div className="container px-4 mx-auto">
            <div className="max-w-lg mx-auto">

                <div className="mb-5 text-center">
                    <NavLink className="hidden mb-3 sm:inline-block" to={ROUTES.HOME_PAGE}>
                        <img className="h-24" src="./loyalty_logo.png" alt=""/>
                    </NavLink>
                    <h3 className="mb-1 text-2xl text-coolGray-900 md:text-3xl font-bold">Register your account</h3>
                    <p className="text-lg text-coolGray-500 font-medium">Jour our community</p>
                    <hr className='mt-1 mb-2'/>
                </div>

                {(showDetailsForm) ? 
                    <form onSubmit={formSubmitHandler}>
                        {/* <p className="mb-2 text-[1.4rem] text-loyaltyGold-100 font-semibold">Add Account Details</p> */}
                        <div className="mb-6">
                            <label className="block mb-2 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Full Name</label>
                            <div className='flex justify-between items-center relative'>
                                <input ref={nameRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="name" type="name" placeholder="Enter your full name" required onInvalid={(e) => {e.preventDefault(); setNameError("Please enter a valid name");}}/>
                                {nameError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                            </div>
                            {nameError ? <p className="text-sm text-red-600 mt-1">{nameError}</p> : ""}
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Email</label>
                            <div className='flex justify-between items-center relative'>
                                <input ref={emailRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="email" type="email" placeholder="Enter your email" required onInvalid={(e) => {e.preventDefault(); setEmailError("Please enter a valid email");}}/>
                                {emailError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                            </div>
                            {emailError ? <p className="text-sm text-red-600 mt-1">{emailError}</p> : ""}
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-coolGray-600 font-medium" htmlFor="">Phone</label>
                            <div className='flex justify-between items-center relative'>
                                <input ref={phoneRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="phone" type="tel" placeholder="Enter your phone number" pattern = "^([0-9]{10})$" onInvalid={(e) => {e.preventDefault(); setPhoneError("Please enter a valid phone example: 7781119999");}}/>
                                {phoneError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                            </div>
                            {phoneError ? <p className="text-sm text-red-600 mt-1">{phoneError}</p> : ""}
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Password</label>
                            <div className='flex justify-between items-center relative'>
                                <input ref={passwordRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="password" type="password" placeholder="Enter your password" required onInvalid={(e) => {e.preventDefault(); setPasswordError("Please enter a valid password");}}/>
                                {passwordError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                            </div>
                            {passwordError ? <p className="text-sm text-red-600 mt-1">{passwordError}</p> : ""}
                            {signUpError ? <p className="text-sm text-red-600 mt-1">{signUpError}</p> : ""}
                        </div>

                        <button type='submit' className="inline-block py-3 px-7 mt-2 mb-6 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">Sign Up</button>
                        
                        <hr className='mb-2 mb-2'/>
                        <p className="text-center">
                            <span className="text-xs font-medium text-coolGray-800">Already have an account?</span>
                            <NavLink className="inline-block text-xs ml-2 font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200 hover:underline transition-all" to={ROUTES.SIGN_IN}>Sign In</NavLink>
                        </p>
                    </form>
                    : ""
                }
                {(showAddCardForm) ? <AddCard /> : ""}
                {(showVerificationForm) ? <ConfirmAccount /> : ""}
            </div>
            </div>
        </section>
    );
}