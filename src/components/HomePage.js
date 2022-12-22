// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveNav } from '../app/appSlice';

// Modules Imports

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './HomePage.css';

export function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("COMPONENT RENDERED: HomePage");
        dispatch(updateActiveNav(ROUTES.HOME_PAGE));
    }, []);
    return (
        <div className=''>
            <h3>
                HOME PAGE
            </h3>
        </div>
    );
}