// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

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

    const [settingOption, setSettingOption] = useState('TODAYS_TOP');
    const [todaysTopOptionClassName, setTodaysTopOptionClassName] = useState('');
    const [bestDealOptionClassName, setBestDealOptionClassName] = useState('');

    useEffect(() => {
        console.log("COMPONENT RENDERED: Promos");
    }, [])

    useEffect(() => {
        dispatch(updateActiveNav(ROUTES.PROMOS));
    }, [dispatch])

    useEffect(() => {
        if(!auth.isAuthenticated) { 
            console.log("COMPONENT Promos: User NOT logged in, Route to Sign In Page")
            navigate(ROUTES.SIGN_IN) 
        }
    }, [auth.isAuthenticated])

    useEffect(() => {
        let active_option = '!text-loyaltyGold-200 !border-b-2 !border-loyaltyGold-200';
        let inactive_option = '';
        switch (settingOption) {
            case 'TODAYS_TOP':
                console.log("COMPONENT Promos: TODAYS_TOP Option Selected");
                setTodaysTopOptionClassName(active_option);
                setBestDealOptionClassName(inactive_option);
                break;
            case 'BEST_DEAL':
                console.log("COMPONENT Promos: BEST_DEAL Option Selected");
                setTodaysTopOptionClassName(inactive_option);
                setBestDealOptionClassName(active_option);
                break;
            default:
                console.log("COMPONENT Promos: No option selected");
                setTodaysTopOptionClassName(inactive_option);
                setBestDealOptionClassName(inactive_option);
                break;
        }
    }, [settingOption])
    
    return (
        <section className="bg-white bg-opacity-0 p-6 px-4 pb-6 min-h-[70vh]">
            <div className="flex flex-wrap items-center justify-between pb-6">
                <div className="w-auto px-4 pl-0">
                    <h2 className="text-2xl font-semibold text-loyaltyGold-100">Promos</h2>
                </div>                
            </div>

            <ul className="flex flex-nowrap overflow-x-auto whitespace-nowrap border-b border-coolGray-200">
                <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${todaysTopOptionClassName}`} onClick={() => {setSettingOption('TODAYS_TOP')}}>Today's Top</button></li>
                <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${bestDealOptionClassName}`} onClick={() => {setSettingOption('BEST_DEAL')}}>Best Deal</button></li>
            </ul>

            <div className='my-6'>
                {(() => {
                    switch(settingOption){
                        case 'TODAYS_TOP':
                            return <h1>TODAYS TOP</h1>
                        case 'BEST_DEAL':
                            return <h1>BEST DEAL</h1>;
                        default:
                            return <h1>PROMOS: NO OPTION SELECTED</h1>;
                    }
                })()}
            </div>
        </section>
    );
}