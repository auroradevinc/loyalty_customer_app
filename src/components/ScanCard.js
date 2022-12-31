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
    const [resultText, setResultText] = useState('');

    const { ref } = useZxing({
        onResult(result) {
            try {
                let url = result.getText(); // www.url.com/signUp?card_id=cardNum&card_cvc=cardCVC
                setResultText(url);
                props.setScannedURL(url);
                props.setScanning(false);
            }
            catch(err) {
                props.setScanningError("Invalid QR Code, Try Entering Manually");
                props.setScanning(false);
            }
        },
        onError(err) {
            props.setScanningError(err.message);
            props.setScanning(false);
        }
    });

    useEffect(() => {
        console.log("COMPONENT RENDERED: ScanCard");
    }, [])

    return (
        <div className='border-2 border-red-300'>
            <label className="block mb-4 text-coolGray-500 text-xxs" htmlFor="">Scan QR Code on Back of the Loyalty Card</label>
            <video ref={ref}/>
            <p>Result: {resultText}</p>
        </div>
    );
}