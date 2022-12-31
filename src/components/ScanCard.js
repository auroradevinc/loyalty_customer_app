// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports

// Modules Imports
import { useZxing } from "react-zxing";

// Components Imports

// Other Files Imports

// Styling Imports
//import './assets/bulma/css/bulma.min.css';

export function ScanCard(props) {
    useEffect(() => {
        console.log("COMPONENT RENDERED: ScanCard");
    }, [])

    let { ref } = useZxing({
        onResult(result) {
            this.props.cardNumRef.current.value = result;
        },
        onError(err) {
            console.log(err);
        }
    });

    return (
        <div className=''>
            <video ref={ref}/>
        </div>
    );
}