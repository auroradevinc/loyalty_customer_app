// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports

// Modules Imports

// Components Imports

// Other Files Imports

// Styling Imports
//import './assets/bulma/css/bulma.min.css';

export function BoilerPlateComponent() {
    useEffect(() => {
        console.log("COMPONENT RENDERED: BoilerPlateComponent");
    }, [])

    return (
        <div className=''>
            <h3>
                BOILTER PLATE COMPONENT
            </h3>
        </div>
    );
}