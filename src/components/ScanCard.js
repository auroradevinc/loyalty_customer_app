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

    useEffect(() => {
        console.log("COMPONENT RENDERED: ScanCard");
    }, [])

    const { ref } = useZxing({
        onResult(result) {
            try {
                let url = result.getText(); // www.url.com/signUp?card_id=cardNum&card_cvc=cardCVC
                let query_param = url.split('?');
                query_param = query_param[1].split('&');
    
                this.props.cardNumRef.current.value = query_param[0].split('=')[1]
                this.props.cardCVCRef.current.value = query_param[1].split('=')[1]
                this.props.setScanning(false);
            }
            catch(err) {
                this.props.setScanningError("Invalid QR Code, Try Entering Manually");
                this.props.setScanning(false);
            }
        },
        onError(err) {
            this.props.setScanningError(err.message);
            this.props.setScanning(false);
        }
    });

    return (
        <div className='border-2 border-red-300'>
            <label className="block mb-4 text-coolGray-500 text-xxs" htmlFor="">Scan QR Code on Back of the Loyalty Card</label>
            <video ref={ref}/>
            <p>{resultText}</p>
        </div>
    );
}