// React Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore, saveCardDetails, verifyCardDetails, assignNewCardDetails } from '../../../app/appSlice';

// Modules Imports
import { useNavigate } from "react-router-dom";

// Components Imports
import { ScanCard } from './ScanCard';

// Other Files Imports
import * as ROUTES from '../../../constants/routes';

// Styling Imports
import './AddCard.css';

export function AddCard(props) {
    const app = useSelector(appStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const cardNumRef = useRef();                                 // Reference to store card id
    const cardCVCRef = useRef();                                 // Reference to store card cvc/security code

    const [hasCamera, setHasCamera] = useState(false);           // Toggles if device camera is available
    const [addCardButton, setAddCardButton] = useState('Verify');// Stores state of card button(Possible values: 'verify' and 'next')
    const [assignCardButtonDisplay, setAssignCardButtonDisplay] = useState('');// Stores state of assign card button, gets hidden after a new card is assigned

    const [scanning, setScanning] = useState(false);             // Toggles Scan component when scan button clicked
    const [hasScannedOnce, setHasScannedOnce] = useState(false); // Toggles when scanning performed atleast once
    const [scannedURL, setScannedURL] = useState('');            // Stores scanned URL
    const [scanningError, setScanningError] = useState('');      // Stores scanned error
    const [scanningSuccess, setScanningSuccess] = useState('');  // Stores scanned success

    let checkDeviceCamera = () => {
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
    }

    useEffect(() => {
        console.log("COMPONENT RENDERED: AddCard");
        checkDeviceCamera();
    }, [])

    useEffect(() => {
        if(scannedURL.length > 0){
            console.log(`COMPONENT AddCard: Scanned URL: ${scannedURL}`);
            try {
                setScanningError("");
                let query_param = scannedURL.split('?');
                query_param = query_param[1].split('&');
    
                let card = {
                    'id': query_param[0].split('=')[1],
                    'cvc': query_param[1].split('=')[1]
                }
        
                cardNumRef.current.value = card.id;
                cardCVCRef.current.value = card.cvc;
                console.log("COMPONENT AddCard: Saving Card Details");
                dispatch(saveCardDetails(card));
                setScanningSuccess("");
                setScanningError("");
                setHasScannedOnce(true);
            } catch(e) {
                console.log("COMPONENT AddCard: Invalid URL");
                setScanningError("Error Scanning Code, Try Entering Details Manually");
            }
        }
    }, [scannedURL])

    useEffect(() => {
        if(scanningError && hasScannedOnce){
            console.log("COMPONENT AddCard: Scanning Error, Remove Scanning");
            // Reset Camera Button, Remove Scanning
            // User can enter detials manually or try scanning again
            checkDeviceCamera();
            setScanning(false);
        }
        if(scanningError && !hasScannedOnce) { // ReactZxing error on initial render is ignored
            setScanningError('');
        }
    }, [scanningError])

    useEffect(() => {
        if(app.hasCardDetailsSaved){
            console.log("COMPONENT AddCard: Verify Card Details");
            dispatch(verifyCardDetails(app.card));
        }

        if(app.hasCardDetailsSavingError){
            console.log("COMPONENT AddCard: Card Details Saving Error");
            setScanningSuccess("");
            setScanningError(app.cardDetailsSavingError);
        }
    }, [app.isCardDetailsSaving, app.hasCardDetailsSaved, app.hasCardDetailsSavingError, app.cardDetailsSavingError, app.card])

    useEffect(() => {
        if(app.hasCardDetailsVerified){
            console.log("COMPONENT AddCard: Card Details Verified");
            setScanningSuccess("Verified");
            setAddCardButton("Next");
        }

        if(app.hasCardDetailsVerifyingError){
            console.log("COMPONENT AddCard: Card Details Verifying Error");
            setScanningSuccess("");
            setScanningError(app.verifyCardDetailsError);
        }
    }, [app.isCardDetailsVerifying, app.hasCardDetailsVerified, app.hasCardDetailsVerifyingError, app.verifyCardDetailsError])

    useEffect(() => {
        if(app.hasNewCardDetailsAssigned){
            console.log("COMPONENT AddCard: New Card Details Assigned");
            cardNumRef.current.value = app.card.id;
            cardCVCRef.current.value = app.card.cvc;
            setAssignCardButtonDisplay('!hidden');
        }

        if(app.hasNewCardDetailsAssigningError){
            console.log("COMPONENT AddCard: New Card Details Assigning Error");
            setScanningSuccess("");
            setScanningError(app.newCardDetailsAssigningError);
        }
    }, [app.isCardDetailsAssigning, app.hasNewCardDetailsAssigned, app.hasNewCardDetailsAssigningError, app.newCardDetailsAssigningError])

    let formSubmitHandler = (event) => {
        event.preventDefault();

        if(scanningSuccess === 'Verified'){
            console.log(`COMPONENT AddCard: Next Card Form Submission`);
            props.setAddCardComplete(true);
        }
        else {
            let cardNumber = cardNumRef.current.value;
            let cardCVC = cardCVCRef.current.value;
            
            console.log(`COMPONENT AddCard: Verify Card Form Submission. Card ID: ${cardNumber}, CVC Code: ${cardCVC}`);
    
            dispatch(saveCardDetails({'id': cardNumber, 'cvc': cardCVC}));
        }
    }

    let scanCardHandler = (event) => {
        event.preventDefault();
        console.log("COMPONENT AddCard: Scan Card Button Clicked");
        setScanning(true);
    }

    let assignNewCardHandler = (event) => {
        event.preventDefault();
        console.log("COMPONENT AddCard: Assign New Card Button Clicked");
        dispatch(assignNewCardDetails());
        props.setAddCardComplete(true);
    }

    return (
        <form onSubmit={formSubmitHandler}>
            {/* <p className="mb-2 text-[1.4rem] text-loyaltyGold-100 font-semibold">Add Loyalty Card Details</p> */}
            <div className="mb-6">
                <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Card Number</label>
                {/* <label className="block mb-2 text-coolGray-500 text-xxs" htmlFor="">Located back of Loyalty Card</label> */}
                <div className='flex justify-between items-center relative'>
                    <input ref={cardNumRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="cardID" type="text" placeholder="Enter the Loyalty Card Number" required onChange={() => {setScanningSuccess(''); setAddCardButton('Verify');}}/>
                    {scanningSuccess ? <span className='absolute right-4'><i className="fa-solid fa-check" style={{color: '#48C774'}}></i></span> : ""}
                    {scanningError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                </div>
            </div>
            <div className="mb-6">
                <label className="block mb-1 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">CVC</label>
                {/* <label className="block mb-2 text-coolGray-500 text-xxs" htmlFor="">Located back of Loyalty Card</label> */}
                <div className='flex justify-between items-center relative'>
                    <input ref={cardCVCRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="cvcCode" type="text" placeholder="Enter the Loyalty Card CVC" required onChange={() => {setScanningSuccess(''); setAddCardButton('Verify');}}/>
                    {scanningSuccess ? <span className='absolute right-4'><i className="fa-solid fa-check" style={{color: '#48C774'}}></i></span> : ""}
                    {scanningError ? <exclamation className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></exclamation> : ""}
                </div>
                <p className="text-sm text-red-600 mt-1">{scanningError}</p>
                <p className="text-sm text-green-600 mt-1">{scanningSuccess}</p>
            </div>
            
            {(scanning) ? <ScanCard setScannedURL={setScannedURL} setScanningError={setScanningError}/> : ""}

            {(hasCamera) ? 
                <div className="mb-3 md:flex">
                    <button className="inline-block py-3 px-7 mt-2 mb-3 md:mr-3 w-full text-base text-white font-medium text-center leading-6 bg-gray-400 hover:bg-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all" onClick={(event) => scanCardHandler(event)}><i className="fa-solid fa-camera mr-2" />Scan Card</button>
                    <button type='submit' className="inline-block py-3 px-7 mt-2 mb-3 md:ml-3 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">Confirm</button>
                </div>
                :
                <div className="mb-3 md:flex">
                    <button type='submit' className="inline-block py-3 px-7 mt-2 mb-3 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">{addCardButton}</button>
                </div>
            }

            <p className="text-center mb-6">
                <button className={`inline-block ${assignCardButtonDisplay} text-xs underline ml-2 font-medium text-loyaltyGold-100 hover:text-loyaltyGold-200 hover:underline transition-all`} onClick={assignNewCardHandler}>I don't have a Loyalty Card</button>
            </p>
        </form>
    );
}