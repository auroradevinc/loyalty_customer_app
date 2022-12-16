// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../app/authSlice';

// Modules Imports
import { useNavigate } from 'react-router-dom';

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './Promos.css';

export function Promos() {
    const auth = useSelector(authStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        console.log("COMPONENT RENDERED: Promos");

        if(auth.isAuthenticated == false) { 
            console.log("COMPONENT Promos: User NOT logged in, Route to Home Page")
            navigate(ROUTES.HOME_PAGE) 
        }
    }, [])

    useEffect(() => {
        if(auth.isAuthenticated == false) { 
            console.log("COMPONENT Promos: User NOT logged in, Route to Home Page")
            navigate(ROUTES.HOME_PAGE) 
        }
    }, [auth.isAuthenticated])

    return (
        <div className=''>
            <h1>
                Promos
            </h1>
        </div>
    );
}