// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports

// Modules Imports
import { useZxing } from "react-zxing";

// Components Imports

// Other Files Imports

// Styling Imports
//import './assets/bulma/css/bulma.min.css';

export function ScanCard(props) {
    // const [resultText, setResultText] = useState('');

    const { ref } = useZxing({
        onResult(result) {
            let url = result.getText(); // www.url.com/signUp?card_id=cardNum&card_cvc=cardCVC
            
            // ---------|
            // IMPORTANT: React Zxing can only update one state variable, more than one will cause errors
            // ---------|
            //setResultText(url); 
            props.setScannedURL(url);
        },
        onError(err) {
            props.setScanningError("Error Scanning Code, Try Entering Details Manually");
        }
    });

    useEffect(() => {
        console.log("COMPONENT RENDERED: ScanCard");
        props.setScanningError("");
    }, [])

    return (
        <div className=''>
            <label className="block mb-2 text-coolGray-500 text-xxs" htmlFor="">Scan QR Code on Back of the Loyalty Card</label>
            <video className='rounded-md shadow-md' ref={ref}/>
            {/* <p>Result: {resultText}</p> */}
        </div>
    );
}