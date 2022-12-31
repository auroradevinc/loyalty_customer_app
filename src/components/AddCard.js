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
import { ScanCard } from './ScanCard';

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './AddCard.css';

export function AddCard() {
    const app = useSelector(appStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const cardNumRef = useRef();
    const cardCVCRef = useRef();

    const [hasCamera, setHasCamera] = useState(false);

    const [scanning, setScanning] = useState(false);
    const [scannedURL, setScannedURL] = useState('');
    const [scanningError, setScanningError] = useState('');
    const [scanningSuccess, setScanningSuccess] = useState('');

    useEffect(() => {
        console.log("COMPONENT RENDERED: AddCard");

        // Check if device hasCamera, Only if yes, Scan Card button is visible
        navigator.mediaDevices.enumerateDevices().then(devices => {
            const cameras = devices.filter(device => device.kind === 'videoinput');
            if(cameras.length > 0){
                console.log(`COMPONENT AddCard: Device has Camera`);
                setHasCamera(true);
            }
            else {
                console.log(`COMPONENT AddCard: Device does NOT have Camera`);
                setHasCamera(false);
            }
          });
    }, [])

    useEffect(() => {
        try {
            let query_param = scannedURL.split('?');
            query_param = query_param[1].split('&');

            let card = {
                'id': query_param[0].split('=')[1],
                'cvc': query_param[1].split('=')[1]
            }
    
            cardNumRef.current.value = card.id;
            cardCVCRef.current.value = card.cvc;
            console.log("COMPONENT AddCard: Scanned, Save Card Details");
            dispatch(saveCardDetails(card));
        } catch(e) {
            console.log("COMPONENT AddCard: Invalid URL");
        }
    }, [scannedURL])

    useEffect(() => {
        if(scanningError){
            console.log("COMPONENT AddCard: Scanning Error, Remove Scanning");
            //Remove Scanning
            setHasCamera(false);
        }
    }, [scanningError])

    useEffect(() => {
        if(app.hasCardDetails && app.isCardDetailsVerified){
            console.log("COMPONENT AddCard: Has Card Details, Card Details Verified, Close Scanning");
            //Remove Scanning
            setHasCamera(false);
            setScanning(false);
            setScanningSuccess('Card Details Valid');
            setScanningError('');
        }
        else {
            console.log("COMPONENT AddCard: Card Details not saved and/or invalid, Open Scanning");
            setHasCamera(true);
            setScanning(true);
            setScanningSuccess('');
            setScanningError('Card Details InValid, Try Again');
        }
    }, [app.hasCardDetails, app.isCardDetailsVerified])

    let formSubmitHandler = (event) => {
        event.preventDefault();

        let cardNumber = cardNumRef.current.value;
        let cardCVC = cardCVCRef.current.value;
        
        console.log(`COMPONENT AddCard: Add Card Form Submission. Card ID: ${cardNumber}, CVC Code: ${cardCVC}`);

        dispatch(saveCardDetails({'id': cardNumber, 'cvc': cardCVC}));
    }

    let scanCardHandler = (event) => {
        event.preventDefault();
        console.log("COMPONENT AddCard: Scan Card Button Clicked");
        setScanning(true);
    }

    return (
        <form onSubmit={formSubmitHandler}>
            {/* <p className="mb-2 text-[1.4rem] text-loyaltyGold-100 font-semibold">Add Loyalty Card Details</p> */}
            <div className="mb-6">
                <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Card Number</label>
                {/* <label className="block mb-2 text-coolGray-500 text-xxs" htmlFor="">Located back of Loyalty Card</label> */}
                <div className='flex justify-between items-center relative'>
                    <input ref={cardNumRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="cardID" type="text" placeholder="Enter the Loyalty Card Number" required/>
                    {scanningSuccess ? <span className='absolute right-4'><i className="fa-solid fa-check" style={{color: '#48C774'}}></i></span> : ""}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">CVC</label>
                {/* <label className="block mb-2 text-coolGray-500 text-xxs" htmlFor="">Located back of Loyalty Card</label> */}
                <div className='flex justify-between items-center relative'>
                    <input ref={cardCVCRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="cvcCode" type="text" placeholder="Enter the Loyalty Card CVC" required/>
                    {scanningSuccess ? <span className='absolute right-4'><i className="fa-solid fa-check" style={{color: '#48C774'}}></i></span> : ""}
                </div>
                <p className="text-sm text-red-600 mt-1">{scanningError}</p>
                <p className="text-sm text-green-600 mt-1">{scanningSuccess}</p>
            </div>
            
            {(scanning) ? <ScanCard setScannedURL={setScannedURL} setScanningError={setScanningError} setScanning={setScanning}/> : ""}

            {(hasCamera) ? 
                <div className="mb-3 md:flex">
                    <button className="inline-block py-3 px-7 mt-2 mb-3 md:mr-3 w-full text-base text-white font-medium text-center leading-6 bg-gray-400 hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all" onClick={(event) => scanCardHandler(event)}><i className="fa-solid fa-camera mr-2" />Scan Card</button>
                    <button type='submit' className="inline-block py-3 px-7 mt-2 mb-3 md:ml-3 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">Confirm</button>
                </div>
                :
                <div className="mb-3 md:flex">
                    <button type='submit' className="inline-block py-3 px-7 mt-2 mb-3 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">Confirm</button>
                </div>
            }

            <p className="text-center mb-6">
                <button className="inline-block text-xs underline ml-2 font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200 hover:underline transition-all">I don't have a Loyalty Card</button>
            </p>
            
            <hr className='mb-2 mb-2'/>
            <p className="text-center">
                <span className="text-xs font-medium text-coolGray-800">Already have an account?</span>
                <NavLink className="inline-block text-xs ml-2 font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200 hover:underline transition-all" to={ROUTES.SIGN_IN}>Sign In</NavLink>
            </p>
        </form>
    );
}