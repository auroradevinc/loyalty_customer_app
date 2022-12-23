// React Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, fetchUserFromLocal, signIn } from '../app/authSlice';
import { updateActiveNav } from '../app/appSlice';

// Modules Imports
import { NavLink, useNavigate } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './SignIn.css';

export function SignIn() {
    const auth = useSelector(authStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signInError, setSignInError] = useState("");

    useEffect(() => {
        console.log("COMPONENT RENDERED: SignIn");
        dispatch(updateActiveNav(ROUTES.SIGN_IN));
    }, [])

    useEffect(() => {
        dispatch(fetchUserFromLocal());
    }, [dispatch])

    useEffect(() => {
        if(auth.isAuthenticated){ 
          console.log("COMPONENT SignIn: User already logged in, Route to Promos");
          navigate(ROUTES.PROMOS) 
        }
      }, [auth.isAuthenticated])

    useEffect(() => {
        if(auth.error && auth.error.toLowerCase().includes('username')){ setUsernameError(auth.error) }
        if(auth.error && auth.error.toLowerCase().includes('password')){ setPasswordError(auth.error) }
        if(auth.error && !auth.error.toLowerCase().includes('no current user')) { setSignInError(auth.error) } // No Current User: Error when fetchUserFromLocal does not return a user
    }, [auth.error])

    let formSubmitHandler = (event) => {
        event.preventDefault();

        // extract email/phone number from username
        let password = passwordRef.current.value;
        let email, phone = '';
        let username;
        if (usernameRef.current.value.includes('@')) { 
            email = usernameRef.current.value.toLowerCase() 
            username = email;
        } else { 
            phone =  usernameRef.current.value 
            username = phone;
        }
        
        console.log(`COMPONENT SignIn: SignIn form Submission. Email: ${email}, Phone: ${phone}, Password: ${password}`);

        dispatch(signIn({username, password}));
    }
    
    return (
        <section className="bg-white bg-opacity-0">
            {/* Background Image */}
            {/* style={{ backgroundImage: "url('./pattern-white.svg')", backgroundPosition: "center" }} */}
            <div className="container px-4 mx-auto">
                <div className="max-w-lg mx-auto">

                    <div className="mb-7 text-center">
                        <NavLink className="hidden mb-3 sm:inline-block" to={ROUTES.HOME_PAGE}>
                            <img className="h-24" src="./loyalty_logo.png" alt=""/>
                        </NavLink>
                        <h3 className="mb-2 text-2xl text-coolGray-900 md:text-3xl font-bold">Sign in to your account</h3>
                        <p className="text-lg text-coolGray-500 font-medium">Welcome back!</p>
                    </div>

                    <form onSubmit={formSubmitHandler}>
                        <div className="mb-6">
                            <label className="block mb-2 text-coolGray-600 font-medium" htmlFor="">Email or Phone</label>
                            <div className='flex justify-between items-center relative'>
                                <input ref={usernameRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="email" type="text" placeholder="Enter your email or phone number" required pattern = "^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|([0-9]{10})$" onInvalid={(e) => {e.preventDefault(); setUsernameError("Please enter a valid email or phone");}}/>
                                {usernameError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                            </div>
                            {usernameError ? <p className="text-sm text-red-600 mt-1">{usernameError}</p> : ""}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-coolGray-600 font-medium" htmlFor="">Password</label>
                            <div className='flex justify-between items-center relative'>
                                <input ref={passwordRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="password" type="password" placeholder="Enter your password" required onInvalid={(e) => {e.preventDefault(); setPasswordError("Please enter a valid passoword");}}/>
                                {passwordError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                            </div>
                            {passwordError ? <p className="text-sm text-red-600 mt-1">{passwordError}</p> : ""}
                            {signInError ? <p className="text-sm text-red-600 mt-1">{signInError}</p> : ""}
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="w-full md:w-1/2 flex items-center justify-start">
                                <label className="relative inline-flex items-center">
                                    <input className="form-checkbox accent-loyaltyGold-200" type="checkbox" />
                                    <span className="ml-2 text-xs text-coolGray-800 font-medium">Remember me</span>
                                </label>
                            </div>
                            <div className="w-full md:w-auto flex justify-end">
                                <NavLink className="inline-block text-xs font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200" to={ROUTES.HOME_PAGE}>Forgot your password?</NavLink>
                            </div>
                        </div>

                        <button type='submit' className="inline-block py-3 px-7 mb-6 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">Sign In</button>
                        
                        <p className="text-center">
                            <span className="text-xs font-medium text-coolGray-800">Don’t have an account?</span>
                            <NavLink className="inline-block text-xs ml-2 font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200 hover:underline transition-all" to={ROUTES.SIGN_UP}>Sign up</NavLink>
                        </p>
                    </form>
                </div>
            </div>
      </section>
    );
}