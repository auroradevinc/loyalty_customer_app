// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector } from 'react-redux';
import { appStore } from '../app/appSlice';

// Modules Imports
import { NavLink } from 'react-router-dom';

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './BottomNavbar.css';

export function BottomNavbar() {
    const app = useSelector(appStore);

    useEffect(() => {
        console.log("COMPONENT RENDERED: BottomNavbar");
    }, [])

    return (
        <div className="relative sm:hidden">
            <div className="fixed flex items-center justify-around w-full bottom-0 left-0 right-0 py-2 border-t-4 border-loyaltyGoldFaded-100 cursor-pointer rounded-t-md shadow-md bg-white" style={{boxShadow: 'rgb(0 0 0 / 63%) 0px 11px 20px 0px'}}>
                <NavLink className='flex flex-col justify-center items-center text-coolGray-500 hover:text-loyaltyGold-100 font-medium hover:bg-coolGray-50 transition-all' to={ROUTES.INVITE_FRIEND}>
                    <i className={`fa-solid fa-user-plus mb-1 text-xl transition-all ${(app.nav.activeLink && app.nav.activeLink === ROUTES.INVITE_FRIEND) ? 'text-loyaltyGold-100' : ''}`}></i>
                    <p className={`text-xxs font-semibold transition-all ${(app.nav.activeLink && app.nav.activeLink === ROUTES.INVITE_FRIEND) ? 'text-loyaltyGold-100' : ''}`}>Invite</p>
                </NavLink>
                <div className='vertical-line h-[40px] border-r-[1px] border-coolGray-300'></div>
                <NavLink className='flex flex-col justify-center items-center text-coolGray-500 hover:text-loyaltyGold-100 font-medium hover:bg-coolGray-50 transition-all' to={ROUTES.CARD}>
                    <i className={`fa-solid fa-credit-card mb-1 text-2xl transition-all ${(app.nav.activeLink && app.nav.activeLink === ROUTES.CARD) ? 'text-loyaltyGold-100' : ''}`}></i>
                    <p className={`text-xxs font-semibold transition-all ${(app.nav.activeLink && app.nav.activeLink === ROUTES.CARD) ? 'text-loyaltyGold-100' : ''}`}>Card</p>
                </NavLink>
                <div className='vertical-line h-[40px] border-r-[1px] border-coolGray-300'></div>
                <NavLink className='flex flex-col justify-center items-center text-coolGray-500 hover:text-loyaltyGold-100 font-medium hover:bg-coolGray-50 transition-all' to={ROUTES.PROMOS}>
                        <i className={`fa-solid fa-tags mb-1 text-xl transition-all ${(app.nav.activeLink && app.nav.activeLink === ROUTES.PROMOS) ? 'text-loyaltyGold-100' : ''}`}></i>
                        <p className={`text-xxs font-semibold transition-all ${(app.nav.activeLink && app.nav.activeLink === ROUTES.PROMOS) ? 'text-loyaltyGold-100' : ''}`}>Promos</p>
                </NavLink>
                <div className='vertical-line h-[40px] border-r-[1px] border-coolGray-300'></div>
                <NavLink className='flex flex-col justify-center items-center text-coolGray-500 hover:text-loyaltyGold-100 font-medium hover:bg-coolGray-50 transition-all' to={ROUTES.SETTINGS}>
                    <i className={`fa-solid fa-gear mb-1 text-xl transition-all ${(app.nav.activeLink && app.nav.activeLink === ROUTES.SETTINGS) ? 'text-loyaltyGold-100' : ''}`}></i>
                    <p className={`text-xxs font-semibold transition-all ${(app.nav.activeLink && app.nav.activeLink === ROUTES.SETTINGS) ? 'text-loyaltyGold-100' : ''}`}>Settings</p>
                </NavLink>
            </div>
        </div>
    );
}