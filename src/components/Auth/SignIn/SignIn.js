// React Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, fetchUserFromLocal, setUpAuthState, signIn, resendConfirmCode } from '../../../app/authSlice';
import { updateActiveNav } from '../../../app/appSlice';

// Modules Imports
import { ConfirmAccount } from '../ConfirmAccount';
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../../../constants/routes';

// Styling Imports
import './SignIn.css';

export function SignIn(props) {
    const auth = useSelector(authStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location  = useLocation();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [alert, setAlert] = useState();

    const [showDetailsForm, setShowDetailsForm] = useState(true);
    const [showVerificationForm, setShowVerificationForm] = useState(false);

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signInError, setSignInError] = useState("");

    useEffect(() => {
        console.log("COMPONENT RENDERED: SignIn");
    }, [])

    useEffect(() => {
        console.log("COMPONENT SignIn: Updating Active Nav");
        dispatch(updateActiveNav(ROUTES.SIGN_IN));
        console.log("COMPONENT SignIn: Attempt Fetch User from Local");
        dispatch(fetchUserFromLocal());
    }, [dispatch])

    useEffect(() => {
        if(auth.hasLocalFetched && !auth.isAuthenticated){
            console.log("COMPONENT SignIn: Has local fetched, Not logged in, Set up sign in page");
            dispatch(setUpAuthState());
            setShowDetailsForm(true);
            setShowVerificationForm(false);
            setUsernameError("");
            setPasswordError("");
            setSignInError("");
        }
    },[auth.hasLocalFetched])

    useEffect(() => {
        if(auth.isAuthenticated) { 
          console.log("COMPONENT SignIn: User already logged in, Route to Promos");
          navigate(ROUTES.PROMOS) 
        }
    }, [auth.isAuthenticated])

    useEffect(() => {
    if(auth.authError === "User is not confirmed."){ 
        console.log("COMPONENT SignIn: User not confirmed, Toggle Verification");
        dispatch(resendConfirmCode({'username': usernameRef.current.value}));
        setShowDetailsForm(false);
        setShowVerificationForm(true); 
    }
    }, [auth.authError])

    useEffect(() => {
        console.log("COMPONENT SignIn: Auth error triggered");
        if(auth.authError && auth.authError.toLowerCase().includes('username')){ setUsernameError(auth.authError) }
        if(auth.authError && auth.authError.toLowerCase().includes('password')){ setPasswordError(auth.authError) }
        if(auth.authError && !auth.authError.toLowerCase().includes('no current user')) { setSignInError(auth.authError) } // No Current User: Error when fetchUserFromLocal does not return a user
    }, [auth.authError])

    useEffect(() => {
        if(alert && alert.message === "Account Successfully Confirmed, SignIn Again"){
            setShowDetailsForm(true);
            setShowVerificationForm(false);
            setSignInError(''); // Removing: User not confirmed error
        }
    }, [alert])

    let formSubmitHandler = (event) => {
        event.preventDefault();

        let password = passwordRef.current.value;
        let username = usernameRef.current.value;
        
        console.log(`COMPONENT SignIn: SignIn form Submission. Email: ${username}, Password: ${password}`);

        dispatch(signIn({username, password}));
    }
    
    return (
        <section className="bg-white bg-opacity-0 min-h-[70vh]">
            <div className="container px-4 mx-auto">
                <div className="max-w-lg mx-auto">

                    <div className="mb-7 text-center">
                        <NavLink className="hidden mb-3 sm:inline-block" to={ROUTES.HOME_PAGE}>
                            <img className="h-24" src="./loyalty_logo.png" alt=""/>
                        </NavLink>
                        <h3 className="mb-2 text-2xl text-coolGray-900 md:text-3xl font-bold">Sign in to your account</h3>
                        <p className="text-lg text-coolGray-500 font-medium">Welcome back!</p>
                        <hr className='mt-2 mb-2'/>
                    </div>
                    
                    {(alert && alert.type && alert.type === 'success') ? 
                        <div className='flex items-center my-2 mb-4 p-2 leading-5 border-[0.5px] border-[#257953] bg-[#effaf5] rounded-lg shadow-sm'>
                            <i className="fa-solid fa-check mr-1 text-[#257953]"/>
                            <p className='text-[#257953] font-medium'>{alert.message}</p>
                        </div>
                        : ""
                    }

                    {(alert && alert.type && alert.type === 'error') ? 
                        <div className='flex items-center my-2 mb-4 p-2 leading-5 border-[0.5px] border-[#cc0f35] bg-[#feecf0] rounded-lg shadow-sm'>
                            <i className="fa-solid fa-exclamation mr-1 ml-1 text-[#cc0f35]"/>
                            <p className='text-[#cc0f35] font-medium'>{alert.message}</p>
                        </div>
                        : ""
                    }

                    {(showDetailsForm) ?
                        <form onSubmit={formSubmitHandler}>
                            <div className="mb-6">
                                <label className="block mb-2 text-coolGray-600 font-medium" htmlFor="">Email or Phone</label>
                                <div className='flex justify-between items-center relative'>
                                    <input ref={usernameRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="email" type="email" placeholder="Enter your email" required autoComplete="username" onInvalid={(e) => {e.preventDefault(); setUsernameError("Please enter a valid email");}}/>
                                    {usernameError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                </div>
                                {usernameError ? <p className="text-sm text-red-600 mt-1">{usernameError}</p> : ""}
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-coolGray-600 font-medium" htmlFor="">Password</label>
                                <div className='flex justify-between items-center relative'>
                                    <input ref={passwordRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="password" type="password" placeholder="Enter your password" required autoComplete="current-password" onInvalid={(e) => {e.preventDefault(); setPasswordError("Please enter a valid passoword");}}/>
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
                        </form>
                        : ""
                    }

                    {(showVerificationForm) ? <ConfirmAccount setSignInPageAlert={setAlert}/> : ""}

                    <hr className='mb-2 mb-2'/>
                    <p className="text-center">
                        <span className="text-xs font-medium text-coolGray-800">Don’t have an account?</span>
                        <NavLink className="inline-block text-xs ml-2 font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200 hover:underline transition-all" to={ROUTES.SIGN_UP}>Sign up</NavLink>
                    </p>
                </div>
            </div>
      </section>
    );
}