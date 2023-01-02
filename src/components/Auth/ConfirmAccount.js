// Base Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, autoSignIn, confirmCode } from '../../app/authSlice';

// Modules Imports
import { NavLink, useNavigate } from "react-router-dom";
import { Hub } from 'aws-amplify';

// Components Imports

// Other Files Imports
import * as ROUTES from '../../constants/routes';

// Styling Imports
import './ConfirmAccount.css';

export function ConfirmAccount(props) {
    const auth = useSelector(authStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const verificationCodeRef = useRef();

    useEffect(() => {
        console.log("COMPONENT RENDERED: ConfirmAccount");
    }, [])

    useEffect(() => {
        if(auth.hasConfirmed && (auth.isSignedIn || auth.isSignedUp)) {
            Hub.listen('auth', ({ payload }) => {
                const { event } = payload;
                if (event === 'autoSignIn') {
                    console.log("COMPONENT ConfirmAccount: autoSignIn Triggered");
                    let user = payload.data;
                    user = ((user && user.attributes) ? user.attributes : user);
                    
                    let useSession = ((user && user.signInUserSession)) ? user.signInUserSession : null; 
                    let jwtToken = (useSession)? useSession.accessToken.jwtToken : null;
                    dispatch(autoSignIn({message: "user auto signing success", type: "success", data: {user: user, jwtToken: jwtToken}}));
                }
                if (event === 'autoSignIn_failure') {
                    dispatch(autoSignIn({message: "user auto signing failure", type: "failure", error: null}));
                }
            });
        }
    }, [auth.hasConfirmed])

    useEffect(() => {
        if(auth.autoSignInError){
            console.log("COMPONENT signUp: autoSignInError occured, Route to SignIn");
            navigate(ROUTES.SIGN_IN);
        }
    }, [auth.autoSignInError])

    let formSubmitHandler = (event) => {
        event.preventDefault();

        let code = verificationCodeRef.current.value;
        let username = auth.user.username;
        
        console.log(`COMPONENT ConfirmAccount: Verification Form Submission. Username: ${username}, Code: ${code}`);

        dispatch(confirmCode({'username': username, 'code': code}));
    }

    return (
        <form onSubmit={formSubmitHandler}>
            {/* <p className="mb-2 text-[1.4rem] text-loyaltyGold-100 font-semibold">Confirm Account</p> */}
            <div className="mb-6">
                <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Verification Code</label>
                <label className="block mb-4 text-coolGray-500 text-xxs" htmlFor="">
                    Code send
                    {(auth.confirmationCodeDetails) ? ` via ${auth.confirmationCodeDetails.DeliveryMedium} to ${auth.confirmationCodeDetails.Destination}`: ` failed`}
                </label>
                <div className='flex justify-between items-center relative'>
                    <input ref={verificationCodeRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="verificationCode" type="text" placeholder="Enter the verification code" required autoComplete="one-time-code"/>
                    {(auth.confirmationCodeError || auth.confirmationCodeSentError) ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                </div>
                {auth.confirmationCodeError ? <p className="text-sm text-red-600 mt-1">{auth.confirmationCodeError}</p> : ""}
                {auth.confirmationCodeSentError ? <p className="text-sm text-red-600 mt-1">{auth.confirmationCodeSentError}</p> : ""}
            </div>

            <button type='submit' className="inline-block py-3 px-7 mt-2 mb-6 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">Confirm</button>
            
            <hr className='mb-2 mb-2'/>
            <p className="text-center">
                <span className="text-xs font-medium text-coolGray-800">Already have an account?</span>
                <NavLink className="inline-block text-xs ml-2 font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200 hover:underline transition-all" to={ROUTES.SIGN_IN}>Sign In</NavLink>
            </p>
        </form>
    );
}