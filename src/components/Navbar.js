// Base Imports
import React from 'react';

// Modules Imports
import { NavLink, useNavigate } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports


export function Navbar() {
    const navigate = useNavigate();
    return (
        <div className=''>
            <h3>Navbar</h3>

            <NavLink to={ROUTES.SIGN_IN}><span>{ROUTES.SIGN_IN}</span></NavLink>
            <NavLink to={ROUTES.SIGN_UP}><span>{ROUTES.SIGN_UP}</span></NavLink>
            <NavLink to={ROUTES.PROMOS}><span>{ROUTES.PROMOS}</span></NavLink>
            <NavLink to={ROUTES.SETTINGS}><span>{ROUTES.SETTINGS}</span></NavLink>

            <button onClick={() => navigate(ROUTES.SIGN_IN)}>{ROUTES.SIGN_IN}</button>
        </div>
    );
}