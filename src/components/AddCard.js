// React Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore, saveCardDetails } from '../app/appSlice';

// Modules Imports
import { NavLink, useNavigate } from "react-router-dom";
import { useZxing } from "react-zxing";

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

    const [result, setResult] = useState("");
    const { ref } = useZxing({
        onResult(result) {
        setResult(result.getText());
        },
    });

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
        <form onSubmit={formSubmitHandler}>
            <p className="mb-2 text-[1.4rem] text-loyaltyGold-100 font-semibold">Add Card Details</p>
            <div className="mb-6">
                <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Card Number</label>
                <input ref={cardIDRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="cardID" type="text" placeholder="Enter the Loyalty Card Number" required/>
            </div>
            <div className="mb-6">
                <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">CVC</label>
                <input ref={cvcCodeRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="cvcCode" type="text" placeholder="Enter the Loyalty CVC code" required/>
            </div>
            <div className="mb-6">
                <video ref={ref} />
                <span>{result}</span>
            </div>
            <div className="mb-6 md:flex">
                <button type='' className="inline-block py-3 px-7 mt-2 mb-3 md:mr-2 w-full text-base text-white font-medium text-center leading-6 bg-gray-400 hover:bg-gray-500 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all"><i className="fa-solid fa-camera mr-2" />Scan Card</button>
                <button type='submit' className="inline-block py-3 px-7 mt-2 mb-6 md:ml-2 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">Confirm</button>
            </div>
            
            <p className="text-center">
                <span className="text-xs font-medium text-coolGray-800">Already have an account?</span>
                <NavLink className="inline-block text-xs ml-2 font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200 hover:underline transition-all" to={ROUTES.SIGN_IN}>Sign In</NavLink>
            </p>
        </form>
    );
}