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

export function Settings() {
    const auth = useSelector(authStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [settingOption, setSettingOption] = useState('ACCOUNT');
    const [accountOptionClassName, setAccountOptionClassName] = useState('');
    const [notificationOptionClassName, setNotificationOptionClassName] = useState('');
    const [inviteFriendOptionClassName, setInviteFriendOptionClassName] = useState('');

    useEffect(() => {
        console.log("COMPONENT RENDERED: Settings");
        dispatch(updateActiveNav(ROUTES.SETTINGS));
    }, [])

    useEffect(() => {
        if(auth.isAuthenticated == false) { 
            console.log("COMPONENT Settings: User NOT logged in, Route to Sign In page")
            navigate(ROUTES.SIGN_IN) 
        }
    }, [auth.isAuthenticated])

    useEffect(() => {
        let active_option = 'text-loyaltyGold-200 border-loyaltyGold-200';
        let inactive_option = '';
        switch (settingOption) {
            case 'ACCOUNT':
                console.log("COMPONENT Settings: ACCOUNT Option Selected");
                setAccountOptionClassName(active_option);
                setNotificationOptionClassName(inactive_option);
                setInviteFriendOptionClassName(inactive_option);
                break;
            case 'NOTIFICATION':
                console.log("COMPONENT Settings: NOTIFICATION Option Selected");
                setAccountOptionClassName(inactive_option);
                setNotificationOptionClassName(active_option);
                setInviteFriendOptionClassName(inactive_option);
                break;
            case 'INVITE_FRIEND':
                console.log("COMPONENT Settings: INVITE_FRIEND Option Selected");
                setAccountOptionClassName(inactive_option);
                setNotificationOptionClassName(inactive_option);
                setInviteFriendOptionClassName(active_option);
                break;
            default:
                console.log("COMPONENT Settings: No option selected");
                setAccountOptionClassName(inactive_option);
                setNotificationOptionClassName(inactive_option);
                setInviteFriendOptionClassName(inactive_option);
                break;
        }
    }, [settingOption])

    return (
        <section className="bg-white bg-opacity-0 p-8 pb-6">
            <div className="flex flex-wrap items-center justify-between pb-6">
                <div className="w-auto px-4">
                    <h2 className="text-2xl font-semibold text-loyaltyGold-100">Settings</h2>
                </div>                
            </div>

            <ul className="flex flex-wrap border-b border-coolGray-200">
                <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 border-b-2 border-transparent hover:border-loyaltyGold-100 ${accountOptionClassName}`} onClick={() => {setSettingOption('ACCOUNT')}}>Account</button></li>
                <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 border-b-2 border-transparent hover:border-loyaltyGold-100 ${notificationOptionClassName}`} onClick={() => {setSettingOption('NOTIFICATION')}}>Notification</button></li>
                <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 border-b-2 border-transparent hover:border-loyaltyGold-100 ${inviteFriendOptionClassName}`} onClick={() => {setSettingOption('INVITE_FRIEND')}}>Invite Friend</button></li>
            </ul>

            {(() => {
                switch(settingOption){
                    case 'ACCOUNT':
                        return <h1>Account</h1>;
                    case 'NOTIFICATION':
                        return <h1>Notification</h1>;
                    case 'INVITE_FRIEND':
                        return <h1>Invite Friend</h1>;
                    default:
                        return <h1>Settings: NO OPTION SELECTED</h1>;
                }
            })()}
        </section>
    );
}