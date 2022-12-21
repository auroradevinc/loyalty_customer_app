// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

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

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        console.log("COMPONENT RENDERED: NavBar");

        // Toggling Navbar(as sidebar) for smaller screens
        // open
        const burger = document.querySelectorAll('.navbar-burger');
        const menu = document.querySelectorAll('.navbar-menu');

        if (burger.length && menu.length) {
            for (var i = 0; i < burger.length; i++) {
                burger[i].addEventListener('click', function() {
                    for (var j = 0; j < menu.length; j++) {
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
            for (var i = 0; i < backdrop.length; i++) {
                backdrop[i].addEventListener('click', function() {
                    for (var j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                });
            }
        }
    },[])

    useEffect(() => {
        if(!auth.isAuthenticated){ 
          console.log("COMPONENT NavBar: User is not logged in, Route to Home")
          navigate(ROUTES.HOME_PAGE); 
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
                            <li className="mr-12"><NavLink className="text-coolGray-500 hover:text-loyaltyGold-100 font-medium transition-all" to={ROUTES.HOME_PAGE}>Home</NavLink></li>
                            <li className="mr-12"><NavLink className="text-coolGray-500 hover:text-loyaltyGold-100  font-medium transition-all" to={ROUTES.PROMOS}>Promos</NavLink></li>
                        </ul>
                    </div>
                    <div className="hidden md:block md:w-1/3">
                        <div className="flex items-center justify-end">
                            {(auth.isAuthenticated) ? 
                                ""
                                :
                                <NavLink className="inline-block py-2 px-4 mr-2 leading-5 text-coolGray-500 hover:text-loyaltyGold-100 bg-transparent font-medium rounded-md transition-all" to={ROUTES.SIGN_IN}>Log In</NavLink>
                            }

                            {(auth.isAuthenticated) ? 
                                <button className="inline-block py-2 px-4 text-sm leading-5 text-white bg-loyaltyGold-100 hover:bg-loyaltyGold-200 font-medium focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all" onClick={() => dispatch(signOut())}>Sign Out</button>
                                :
                                <NavLink className="inline-block py-2 px-4 text-sm leading-5 text-white bg-loyaltyGold-100 hover:bg-loyaltyGold-200 font-medium focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all" to={ROUTES.SIGN_UP}>Sign Up</NavLink>
                            }
                        </div>
                    </div>
                </div>
                <button className="navbar-burger self-center md:hidden">
                    <svg width="35" height="35" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect className="text-white" width="32" height="32" rx="6" fill="currentColor" />
                        <path className="text-coolGray-500" d="M7 12H25C25.2652 12 25.5196 11.8946 25.7071 11.7071C25.8946 11.5196 26 11.2652 26 11C26 10.7348 25.8946 10.4804 25.7071 10.2929C25.5196 10.1054 25.2652 10 25 10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12ZM25 15H7C6.73478 15 6.48043 15.1054 6.29289 15.2929C6.10536 15.4804 6 15.7348 6 16C6 16.2652 6.10536 16.5196 6.29289 16.7071C6.48043 16.8946 6.73478 17 7 17H25C25.2652 17 25.5196 16.8946 25.7071 16.7071C25.8946 16.5196 26 16.2652 26 16C26 15.7348 25.8946 15.4804 25.7071 15.2929C25.5196 15.1054 25.2652 15 25 15ZM25 20H7C6.73478 20 6.48043 20.1054 6.29289 20.2929C6.10536 20.4804 6 20.7348 6 21C6 21.2652 6.10536 21.5196 6.29289 21.7071C6.48043 21.8946 6.73478 22 7 22H25C25.2652 22 25.5196 21.8946 25.7071 21.7071C25.8946 21.5196 26 21.2652 26 21C26 20.7348 25.8946 20.4804 25.7071 20.2929C25.5196 20.1054 25.2652 20 25 20Z" fill="currentColor" />
                    </svg>
                </button>
            </nav>
        
            <div className="navbar-menu hidden fixed top-0 right-0 z-50 w-full h-full bg-coolGray-900 bg-opacity-50 transition-all">
                <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-xs bg-white">
                    <nav className="relative p-6 h-full overflow-y-auto">
                        <div className="flex flex-col justify-between h-full">
                            <NavLink className="inline-block" to={ROUTES.HOME_PAGE}>
                                <img className="h-20" src="./loyalty_logo.png" alt="" />
                            </NavLink>
                            <ul className="py-6">
                                <li><NavLink className="block mx-auto py-3 px-4 w-fit text-coolGray-500 hover:text-loyaltyGold-100 font-medium hover:bg-coolGray-50 rounded-md transition-all" to={ROUTES.HOME_PAGE}><i className="fa-solid fa-house mr-3"></i>Home</NavLink></li>
                                <li><NavLink className="block mx-auto py-3 px-4 w-fit text-coolGray-500 hover:text-loyaltyGold-100 font-medium hover:bg-coolGray-50 rounded-md transition-all" to={ROUTES.PROMOS}><i className="fa-solid fa-tags mr-3"></i>Promos</NavLink></li>
                                <li><NavLink className="block mx-auto py-3 px-4 w-fit text-coolGray-500 hover:text-loyaltyGold-100 font-medium hover:bg-coolGray-50 rounded-md transition-all" to={ROUTES.SETTINGS}><i className="fa-solid fa-gear mr-3"></i>Settings</NavLink></li>
                            </ul>
                            <div className="flex flex-wrap">
                                <div className="w-full mb-2">
                                    {!(auth.isAuthenticated) ? 
                                        <NavLink className="inline-block py-2 px-4 w-full text-md leading-5 text-coolGray-500 hover:text-loyaltyGold-100 bg-transparent font-medium text-center rounded-md transition-all" to={ROUTES.SIGN_IN}>Log In</NavLink> 
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
                    <a className="navbar-close absolute top-11 p-4 right-3" href="#">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.94004 6L11.14 1.80667C11.2656 1.68113 11.3361 1.51087 11.3361 1.33333C11.3361 1.1558 11.2656 0.985537 11.14 0.860002C11.0145 0.734466 10.8442 0.66394 10.6667 0.66394C10.4892 0.66394 10.3189 0.734466 10.1934 0.860002L6.00004 5.06L1.80671 0.860002C1.68117 0.734466 1.51091 0.663941 1.33337 0.663941C1.15584 0.663941 0.985576 0.734466 0.860041 0.860002C0.734505 0.985537 0.66398 1.1558 0.66398 1.33333C0.66398 1.51087 0.734505 1.68113 0.860041 1.80667L5.06004 6L0.860041 10.1933C0.797555 10.2553 0.747959 10.329 0.714113 10.4103C0.680267 10.4915 0.662842 10.5787 0.662842 10.6667C0.662842 10.7547 0.680267 10.8418 0.714113 10.9231C0.747959 11.0043 0.797555 11.078 0.860041 11.14C0.922016 11.2025 0.99575 11.2521 1.07699 11.2859C1.15823 11.3198 1.24537 11.3372 1.33337 11.3372C1.42138 11.3372 1.50852 11.3198 1.58976 11.2859C1.671 11.2521 1.74473 11.2025 1.80671 11.14L6.00004 6.94L10.1934 11.14C10.2554 11.2025 10.3291 11.2521 10.4103 11.2859C10.4916 11.3198 10.5787 11.3372 10.6667 11.3372C10.7547 11.3372 10.8419 11.3198 10.9231 11.2859C11.0043 11.2521 11.0781 11.2025 11.14 11.14C11.2025 11.078 11.2521 11.0043 11.286 10.9231C11.3198 10.8418 11.3372 10.7547 11.3372 10.6667C11.3372 10.5787 11.3198 10.4915 11.286 10.4103C11.2521 10.329 11.2025 10.2553 11.14 10.1933L6.94004 6Z" fill="#556987" />
                        </svg>
                    </a>
                </div>
            </div>
      </section>
    );
}