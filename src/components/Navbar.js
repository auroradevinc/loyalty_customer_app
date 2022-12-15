// Base Imports
import React from 'react';
import { useEffect } from 'react';

// Modules Imports
import { NavLink, useNavigate } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './Navbar.css';


export function Navbar() {
    useEffect(() => {
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

    const navigate = useNavigate();
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
                        <NavLink className="navbar-item" to={ROUTES.PROMOS}><span>Your Promos</span></NavLink>
                    </div>
                    <div className="navbar-item">
                        <div className="buttons">
                            <NavLink className="button is-primary" to={ROUTES.SIGN_IN}><span>Login/Register</span></NavLink>
                        </div>
                    </div>
                    <div class="navbar-item">
                        <div class="dropdown is-right is-hoverable">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                                <span>
                                    <i class="fa-solid fa-user"></i>
                                </span>
                                <span class="icon is-small">
                                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                                </button>
                            </div>

                            <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                                <div class="dropdown-content">
                                <div class="dropdown-item">
                                    <NavLink to={ROUTES.SETTINGS}><span>Settings</span></NavLink>
                                </div>
                                <div class="dropdown-item">
                                    <NavLink to={ROUTES.HOME_PAGE}><span>Sign Out</span></NavLink>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}