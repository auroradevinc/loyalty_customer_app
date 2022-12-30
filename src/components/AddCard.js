// React Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore, saveCardDetails } from '../app/appSlice';

// Modules Imports
import { NavLink, useNavigate } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './AddCard.css';

export function AddCard() {
    const app = useSelector(appStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const cardIDRef = useRef();
    const cvcCodeRef = useRef();

    useEffect(() => {
        console.log("COMPONENT RENDERED: AddCard");
    }, [])

    let formSubmitHandler = (event) => {
        event.preventDefault();

        let cardID = cardIDRef.current.value;
        let cvcCode = cvcCodeRef.current.value;
        
        console.log(`COMPONENT AddCard: Add Card Form Submission. Card ID: ${cardID}, CVC Code: ${cvcCode}`);

        dispatch(saveCardDetails({'id': cardID}));
    }

    return (
        // <form onSubmit={formSubmitHandler}>
        //     <div className="mb-6">
        //         <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Verification Code</label>
        //         <label className="block mb-4 text-coolGray-500 text-xxs" htmlFor="">
        //             Code send
        //             {(auth.confirmationCodeDetails) ? ` via ${auth.confirmationCodeDetails.DeliveryMedium} to ${auth.confirmationCodeDetails.Destination}`: ` failed`}
        //         </label>
        //         <div className='flex justify-between items-center relative'>
        //             <input ref={verificationCodeRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="verificationCode" type="text" placeholder="Enter the verification code" required autoComplete="one-time-code"/>
        //             {(auth.confirmationCodeError || auth.confirmationCodeSentError) ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
        //         </div>
        //         {auth.confirmationCodeError ? <p className="text-sm text-red-600 mt-1">{auth.confirmationCodeError}</p> : ""}
        //         {auth.confirmationCodeSentError ? <p className="text-sm text-red-600 mt-1">{auth.confirmationCodeSentError}</p> : ""}
        //     </div>

        //     <button type='submit' className="inline-block py-3 px-7 mt-2 mb-6 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">Confirm</button>
            
        //     <p className="text-center">
        //         <span className="text-xs font-medium text-coolGray-800">Already have an account?</span>
        //         <NavLink className="inline-block text-xs ml-2 font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200 hover:underline transition-all" to={ROUTES.SIGN_IN}>Sign In</NavLink>
        //     </p>
        // </form>
        <div className=''>
            <h3>
                ADD CARD
            </h3>
        </div>
    );
}