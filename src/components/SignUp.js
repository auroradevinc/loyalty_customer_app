// Base Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, fetchUserFromLocal, signUp } from '../app/authSlice';
import { updateActiveNav } from '../app/appSlice';

// Modules Imports
import { NavLink } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './SignUp.css';

export function SignUp() {
    const auth = useSelector(authStore);
    const dispatch = useDispatch();

    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        console.log("COMPONENT RENDERED: SignUp");
        dispatch(updateActiveNav(ROUTES.SIGN_UP));
    }, [])

    useEffect(() => {
        dispatch(fetchUserFromLocal());
    }, [dispatch])

    useEffect(() => {
        if(auth.error && auth.error.toLowerCase().includes('email')){ setEmailError(auth.error) }
        if(auth.error && auth.error.toLowerCase().includes('phone')){ setPhoneError(auth.error) }
        if(auth.error && auth.error.toLowerCase().includes('password')){ setPasswordError(auth.error) }
        if(auth.error && auth.error.toLowerCase().includes('name')){ setNameError(auth.error) }
    }, [auth.error])

    let formSubmitHandler = (event) => {
        event.preventDefault();

        console.log(emailRef, phoneRef, passwordRef, nameRef);

        let email = emailRef.current.value;
        let phone = phoneRef.current.value;
        let password = passwordRef.current.value;
        let full_name = nameRef.current.value;
        
        console.log(`COMPONENT SignUp: SignUp form Submission. Email: ${email}, Phone: ${phone}, Password: ${password}, Name: ${full_name}`);

        // dispatch(signUp({email, phone, password, given_name, middle_name, family_name}));
    }


    return (
        <section className="bg-white bg-opacity-0">
            <div className="container px-4 mx-auto">
            <div className="max-w-lg mx-auto">

                <div className="mb-7 text-center">
                    <NavLink className="hidden mb-3 sm:inline-block" to={ROUTES.HOME_PAGE}>
                        <img className="h-24" src="./loyalty_logo.png" alt=""/>
                    </NavLink>
                    <h3 className="mb-2 text-2xl text-coolGray-900 md:text-3xl font-bold">Register your account</h3>
                    <p className="text-lg text-coolGray-500 font-medium">Jour our community</p>
                </div>

                <form onSubmit={formSubmitHandler}>
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
                        <label className="block mb-2 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Phone</label>
                        <div className='flex justify-between items-center relative'>
                            <input ref={phoneRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="phone" type="tel" placeholder="Enter your phone number" pattern = "^([0-9]{10})$" onInvalid={(e) => {e.preventDefault(); setPhoneError("Please enter a valid phone");}}/>
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
                    </div>

                    <button type='submit' className="inline-block py-3 px-7 mt-2 mb-6 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">Sign Up</button>
                    
                    <p className="text-center">
                        <span className="text-xs font-medium text-coolGray-800">Already have an account?</span>
                        <NavLink className="inline-block text-xs ml-2 font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200 hover:underline transition-all" to={ROUTES.SIGN_IN}>Sign In</NavLink>
                    </p>
                </form>
            </div>
            </div>
        </section>
    );
}