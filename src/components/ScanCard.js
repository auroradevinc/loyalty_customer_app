// React Imports
import React from 'react';
import { useEffect, useRef } from 'react';

// Redux Imports

// Modules Imports
import { useZxing } from "react-zxing";

// Components Imports

// Other Files Imports

// Styling Imports
//import './assets/bulma/css/bulma.min.css';

export function ScanCard(props) {
    const scanResult = useRef('');

    useEffect(() => {
        console.log("COMPONENT RENDERED: ScanCard");
    }, [])


    const { ref } = useZxing({
        onResult(result) {
            this.props.cardNumRef.current.value = result;
            this.props.setScanning(false);
            scanResult.current.value = result;
        },
        onError(err) {
            console.log(err);
            this.props.setScanning(false);
        }
    });

    return (
        <div className=''>
            <label className="block mb-4 text-coolGray-500 text-xxs" htmlFor="">Scan QR Code on Back of the Loyalty Card</label>
            <video ref={ref}/>
            <p>{scanResult}</p>
        </div>
    );
}