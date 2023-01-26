// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, signOut } from '../app/authSlice';
import { appStore } from '../app/appSlice';

// Modules Imports
import { NavLink } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './Navbar.css';


export function Navbar() {
    const auth = useSelector(authStore);
    const app = useSelector(appStore);
    const dispatch = useDispatch();

    const [homeNavOptionClassName, setHomeNavOptionClassName] = useState('');
    const [promosNavOptionClassName, setPromosNavOptionClassName] = useState('');
    const [settingsNavOptionClassName, setSettingsNavOptionClassName] = useState('');
    const [signInNavOptionClassName, setSignInNavOptionClassName] = useState('');

    useEffect(() => {

        console.log("COMPONENT RENDERED: NavBar");

        // Toggling Navbar(as sidebar) for smaller screens
        // open
        const burger = document.querySelectorAll('.navbar-burger');
        const menu = document.querySelectorAll('.navbar-menu');

        if (burger.length && menu.length) {
            for (let i = 0; i < burger.length; i++) {
                burger[i].addEventListener('click', function() {
                    for (let j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                });
            }
        }

        // close
        const close = document.querySelectorAll('.navbar-close');
        const backdrop = document.querySelectorAll('.navbar-backdrop');

        if (close.length) {
            for (var i = 0; i < close.length; i++) {
                close[i].addEventListener('click', function() {
                    for (var j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                });
            }
        }

        if (backdrop.length) {
            for (let i = 0; i < backdrop.length; i++) {
                backdrop[i].addEventListener('click', function() {
                    for (let j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                });
            }
        }
    },[])

    useEffect(() => {
        let active_link = '!text-loyaltyGold-200 !border-b-2 !border-loyaltyGold-200';
        let inactive_link = '';
        switch(app.nav.activeLink){
            case ROUTES.HOME_PAGE:
                setHomeNavOptionClassName(active_link);
                setPromosNavOptionClassName(inactive_link);
                setSettingsNavOptionClassName(inactive_link);
                setSignInNavOptionClassName(inactive_link);
                break;
            case ROUTES.PROMOS:
                setHomeNavOptionClassName(inactive_link);
                setPromosNavOptionClassName(active_link);
                setSettingsNavOptionClassName(inactive_link);
                setSignInNavOptionClassName(inactive_link);
                break;
            case ROUTES.SETTINGS:
                setHomeNavOptionClassName(inactive_link);
                setPromosNavOptionClassName(inactive_link);
                setSettingsNavOptionClassName(active_link);
                setSignInNavOptionClassName(inactive_link);
                break;
            case ROUTES.SIGN_IN:
                setHomeNavOptionClassName(inactive_link);
                setPromosNavOptionClassName(inactive_link);
                setSettingsNavOptionClassName(inactive_link);
                setSignInNavOptionClassName(active_link);
                break;
            default:
                setHomeNavOptionClassName(inactive_link);
                setPromosNavOptionClassName(inactive_link);
                setSettingsNavOptionClassName(inactive_link);
                setSignInNavOptionClassName(inactive_link);
                break;
        }
    }, [app.nav])

    useEffect(() => {
        if(!auth.isAuthenticated){ 
            console.log("COMPONENT NavBar: User not logged in");
        }
        else {
            console.log("COMPONENT NavBar: User logged in");
        }
    }, [auth.isAuthenticated])

    return (
        <section className="bg-white bg-opacity-0">
            <nav className="flex justify-between p-6 px-4">
                <div className="flex justify-between items-center w-full">
                    <div className="md:w-1/3">
                        <NavLink className="block max-w-max" to={ROUTES.HOME_PAGE}>
                            <img className="h-20" src="./loyalty_logo.png" alt="" />
                        </NavLink>
                    </div>
                    <div className="hidden md:block md:w-1/3">
                        <ul className="flex justify-center">
                            <li className="mr-12"><NavLink className={`py-1 px-1 text-coolGray-500 hover:text-loyaltyGold-100 font-medium transition-all ${homeNavOptionClassName}`} to={ROUTES.HOME_PAGE}>Home</NavLink></li>
                            <li className="mr-12"><NavLink className={`py-1 px-1 text-coolGray-500 hover:text-loyaltyGold-100 font-medium transition-all ${promosNavOptionClassName}`} to={ROUTES.PROMOS}>Promos</NavLink></li>
                        </ul>
                    </div>
                    <div className="hidden md:block md:w-1/3">
                        <div className="flex items-center justify-end">
                            {(auth.isAuthenticated) ?
                                <NavLink className={`inline-block py-1 px-1 mr-4 leading-5 text-coolGray-500 hover:text-loyaltyGold-100 bg-transparent font-medium transition-all ${settingsNavOptionClassName}`} to={ROUTES.SETTINGS}>Settings</NavLink>
                                :
                                <NavLink className={`inline-block py-1 px-1 mr-4 leading-5 text-coolGray-500 hover:text-loyaltyGold-100 bg-transparent font-medium transition-all ${signInNavOptionClassName}`} to={ROUTES.SIGN_IN}>Log In</NavLink>
                            }

                            {(auth.isAuthenticated) ? 
                                <button className={`inline-block py-2 px-4 text-sm leading-5 text-white bg-loyaltyGold-100 hover:bg-loyaltyGold-200 font-medium focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all ${setHomeNavOptionClassName}`} onClick={() => dispatch(signOut())}>Sign Out</button>
                                :
                                <NavLink className={`inline-block py-2 px-4 text-sm leading-5 text-white bg-loyaltyGold-100 hover:bg-loyaltyGold-200 font-medium focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all ${setHomeNavOptionClassName}`} to={ROUTES.SIGN_UP}>Sign Up</NavLink>
                            }
                        </div>
                    </div>
                </div>
                <button className="navbar-burger self-center md:hidden">
                    <i className="fa-solid fa-bars text-xl text-coolGray-500" />
                </button>
            </nav>
        
            <div className="navbar-menu hidden fixed top-0 right-0 z-50 w-full h-full bg-coolGray-900 bg-opacity-50 transition-all">
                <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-xs bg-white">
                    <nav className="relative p-6 h-full overflow-y-auto">
                        <div className="flex flex-col justify-between h-full">
                            <div className='flex justify-between items-center'>
                                <NavLink className="inline-block" to={ROUTES.HOME_PAGE}>
                                    <img className="h-20" src="./loyalty_logo.png" alt="" />
                                </NavLink>
                                <button className="navbar-close">
                                    <i class="fa-solid fa-xmark text-xl text-coolGray-500"></i>
                                </button>
                            </div>
                            <ul className="py-6">
                                <li><NavLink className={`block mx-auto py-3 px-4 w-fit text-coolGray-500 hover:text-loyaltyGold-100 font-medium hover:bg-coolGray-50 transition-all ${homeNavOptionClassName}`} to={ROUTES.HOME_PAGE}><i className="fa-solid fa-house mr-3"></i>Home</NavLink></li>
                                <li><NavLink className={`block mx-auto py-3 px-4 w-fit text-coolGray-500 hover:text-loyaltyGold-100 font-medium hover:bg-coolGray-50 transition-all ${promosNavOptionClassName}`} to={ROUTES.PROMOS}><i className="fa-solid fa-tags mr-3"></i>Promos</NavLink></li>
                                {(auth.isAuthenticated) ? 
                                    <li><NavLink className={`block mx-auto py-3 px-4 w-fit text-coolGray-500 hover:text-loyaltyGold-100 font-medium hover:bg-coolGray-50 transition-all ${settingsNavOptionClassName}`} to={ROUTES.SETTINGS}><i className="fa-solid fa-gear mr-3"></i>Settings</NavLink></li>
                                    : 
                                    ""
                                }
                            </ul>
                            <div className="flex flex-wrap">
                                <div className="w-full mb-2">
                                    {!(auth.isAuthenticated) ? 
                                        <NavLink className={`inline-block py-2 px-4 w-full text-md leading-5 text-coolGray-500 hover:text-loyaltyGold-100 bg-transparent font-medium text-center transition-all ${signInNavOptionClassName}`} to={ROUTES.SIGN_IN}>Log In</NavLink> 
                                        : 
                                        ""
                                    }
                                </div>
                                <div className="w-full">
                                    {!(auth.isAuthenticated) ? 
                                        <NavLink className="inline-block py-2 px-4 w-full text-md leading-5 text-white bg-loyaltyGold-100 hover:bg-loyaltyGold-200 font-medium text-center focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all" to={ROUTES.SIGN_UP}>Sign Up</NavLink> 
                                        :
                                        <button className="inline-block py-2 px-4 w-full text-md leading-5 text-white bg-loyaltyGold-100 hover:bg-loyaltyGold-200 font-medium text-center focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all" onClick={() => dispatch(signOut())}>Sign Out</button>  
                                    }
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
      </section>
    );
}