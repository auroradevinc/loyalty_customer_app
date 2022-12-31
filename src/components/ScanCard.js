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
    const [barcode, setBarcode] = useState(null);

    useEffect(() => {
        console.log("COMPONENT RENDERED: ScanCard");
    }, [])


    const { ref } = useZxing({
        onResult(result) {
            // this.props.cardNumRef.current.value = result;
            // this.props.setScanning(false);
            setBarcode(result);
        },
        onError(err) {
            console.log(err);
            // this.props.setScanning(false);
        }
    });

    return (
        <div className='border-2 border-red-300'>
            <label className="block mb-4 text-coolGray-500 text-xxs" htmlFor="">Scan QR Code on Back of the Loyalty Card</label>
            <video ref={ref}/>
            <p>Result: {barcode}</p>
        </div>
    );
}