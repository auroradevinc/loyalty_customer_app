// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, signOut } from '../app/authSlice';

// Modules Imports
import { NavLink, useNavigate } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './Navbar.css';


export function Navbar() {
    const auth = useSelector(authStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {

        console.log("COMPONENT RENDERED: NavBar");

        const menus = document.querySelectorAll('.navbar-burger');
        const dropdowns = document.querySelectorAll('.navbar-menu');

        if (menus.length && dropdowns.length) {
            for (var i = 0; i < menus.length; i++) {
                menus[i].addEventListener('click', function() {
                    for (var j = 0; j < dropdowns.length; j++) {
                        dropdowns[j].classList.toggle('is-active');
                    }
                });
            }
        }
    },[])

    return (
        <nav className="navbar py-4">
            <div className="container is-fluid">
                <div className="navbar-brand">
                    <NavLink className="navbar-item" to={ROUTES.HOME_PAGE}>
                        <img className="image" src="./loyalty_logo.png" alt=""/>
                    </NavLink>
                    <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <NavLink className="navbar-item" to={ROUTES.HOME_PAGE}><span>Home</span></NavLink>
                        <NavLink className="navbar-item" to={ROUTES.PROMOS}><span>Your Promos</span></NavLink>
                    </div>

                    {/* Only Show login/register button if user is NOT logged in */}
                    {(!auth.isAuthenticated) ? 
                    <div className="navbar-item">
                        <div className="buttons">
                            <NavLink className="button is-primary" to={ROUTES.SIGN_IN}><span>Login/Register</span></NavLink>
                        </div>
                    </div> : ""}

                    {/* Only Show DropDown if user is logged in */}
                    {(auth.isAuthenticated) ?
                    <div className="navbar-item desktop">
                        <div className="dropdown is-right is-hoverable">
                            <div className="dropdown-trigger">
                                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                                <span>
                                    <i className="fa-solid fa-user"></i>
                                </span>
                                <span className="icon is-small">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                                </button>
                            </div>

                            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                <div className="dropdown-content">
                                    <div className="dropdown-item">
                                        <NavLink to={ROUTES.SETTINGS}><span>Settings</span></NavLink>
                                    </div>
                                    <div className="dropdown-item">
                                        <button className="button is-normal is-primary" onClick={() => dispatch(signOut())}>Sign Out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ""}
                    
                    {/* Mobile version drop navbar show signout only if user is logged in */}
                    {(auth.isAuthenticated) ?
                    <div className="navbar-item mobile">
                        <NavLink to={ROUTES.SETTINGS}><span>Settings</span></NavLink>
                    </div> : ""}

                    {/* Mobile version drop navbar show signout only if user is logged in */}
                    {(auth.isAuthenticated) ?
                    <div className="navbar-item mobile">
                            <button className="button is-normal is-primary" onClick={() => dispatch(signOut())}>Log Out</button>
                    </div>  : ""}
                </div>
            </div>
        </nav>
    );
}