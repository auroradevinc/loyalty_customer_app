// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore } from '../app/authSlice';
import { updateActiveNav } from '../app/appSlice';

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
        dispatch(updateActiveNav(ROUTES.PROMOS));
    }, [])

    useEffect(() => {
        if(auth.isAuthenticated == false) { 
            console.log("COMPONENT Promos: User NOT logged in, Route to Sign In Page")
            navigate(ROUTES.SIGN_IN) 
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