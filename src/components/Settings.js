// React Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore, updateActiveNav } from '../app/appSlice';
import { authStore } from '../app/authSlice';
import { customerStore } from '../app/customerSlice';
import { cardStore } from '../app/cardSlice';

// Modules Imports
import { NavLink, useNavigate } from 'react-router-dom';

// Components Imports
import { BottomNavbar } from './BottomNavbar';

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './Promos.css';

export function Settings() {
    const app = useSelector(appStore);
    const auth = useSelector(authStore);
    const customer = useSelector(customerStore);
    const card  = useSelector(cardStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [settingOption, setSettingOption] = useState('ACCOUNT');
    const [accountOptionClassName, setAccountOptionClassName] = useState('');
    const [inviteFriendOptionClassName, setInviteFriendOptionClassName] = useState('');
    const [changePasswordOptionClassName, setChangePasswordOptionClassName] = useState('');
    const [verifyAccountOptionClassName, setVerifyAccountOptionClassName] = useState('');

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        console.log("COMPONENT RENDERED: Settings");
    }, [])

    useEffect(() => {
        console.log("COMPONENT Settings: Updating Active Nav");
        dispatch(updateActiveNav(ROUTES.SETTINGS));
    }, [dispatch])

    useEffect(() => {
        // if(!auth.isAuthenticated) { 
        //     console.log("COMPONENT Settings: User NOT logged in, Route to Sign In page");
        //     navigate(ROUTES.SIGN_IN);
        // }

        // if(auth.isAuthenticated && !customer.hasCustomerExtractedFromDB) { 
        //     console.log("COMPONENT Settings: Customer Data from DB unavailable, Get Customer Data from DB");
        //     let data = {
        //         customer: {
        //             id: auth.user.sub
        //         }
        //     };
        //     dispatch(getCustomerFromDB(data));
        // }

        // if(customer.hasCustomerExtractedFromDB && !card.hasCardExtractedFromDB) { 
        //     console.log("COMPONENT Settings: Customer Data from DB available, Card Data from db unavailable, Get Card Data from DB");
        //     let data = {
        //         customer: {
        //             id: customer.customer.customer_id,
        //         }
        //     };
        //     dispatch(getCardFromDB(data));
        // }

        // if(customer.hasCustomerExtractedFromDB && !card.hasCardExtractedFromDB) { 

        // }
        
    }, [auth.isAuthenticated, customer.hasCustomerExtractedFromDB, card.hasCardExtractedFromDB])

    useEffect(() => {
        let active_option = '!text-loyaltyGold-200 !border-b-2 !border-loyaltyGold-200';
        let inactive_option = '!border-b-2 !border-transparent';
        switch (settingOption) {
            case 'ACCOUNT':
                console.log("COMPONENT Settings: ACCOUNT Option Selected");
                setAccountOptionClassName(active_option);
                setInviteFriendOptionClassName(inactive_option);
                setChangePasswordOptionClassName(inactive_option);
                setVerifyAccountOptionClassName(inactive_option);

                assignValuesToRef();
                break;
            case 'INVITE_FRIEND':
                console.log("COMPONENT Settings: INVITE_FRIEND Option Selected");
                setAccountOptionClassName(inactive_option);
                setInviteFriendOptionClassName(active_option);
                setChangePasswordOptionClassName(inactive_option);
                setVerifyAccountOptionClassName(inactive_option);
                break;
            case 'CHANGE_PASSWORD':
                console.log("COMPONENT Settings: CHANGE_PASSWORD Option Selected");
                setAccountOptionClassName(inactive_option);
                setInviteFriendOptionClassName(inactive_option);
                setChangePasswordOptionClassName(active_option);
                setVerifyAccountOptionClassName(inactive_option);
                break;
            case 'VERIFY_ACCOUNT':
                console.log("COMPONENT Settings: VERIFY_ACCOUNT Option Selected");
                setAccountOptionClassName(inactive_option);
                setInviteFriendOptionClassName(inactive_option);
                setChangePasswordOptionClassName(inactive_option);
                setVerifyAccountOptionClassName(active_option);
                break;
            default:
                console.log("COMPONENT Settings: No option selected");
                setAccountOptionClassName(inactive_option);
                setChangePasswordOptionClassName(inactive_option);
                setInviteFriendOptionClassName(inactive_option);
                setVerifyAccountOptionClassName(inactive_option);
                break;
        }
    }, [settingOption])

    let formSubmitHandler = (event) => {
        event.preventDefault();
    }

    let assignValuesToRef = () => {
        if(auth.isAuthenticated && auth.user) {
            nameRef.current.value = auth.user.name;
            emailRef.current.value = auth.user.email;
            phoneRef.current.value = (auth.user.phone_number) ? auth.user.phone_number : "";
        }
    }

    return (
        <section className="bg-white bg-opacity-0 p-6 px-4 pb-6 min-h-[70vh]">
            <div className="flex flex-wrap items-center justify-between pb-6">
                <div className="w-auto px-4 pl-0">
                    <h2 className="text-2xl font-semibold text-loyaltyGold-100">Settings</h2>
                </div>                
            </div>

            <ul className="flex flex-nowrap overflow-x-auto whitespace-nowrap border-b border-coolGray-200">
                <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${accountOptionClassName}`} onClick={() => {setSettingOption('ACCOUNT')}}>Account</button></li>
                <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${inviteFriendOptionClassName}`} onClick={() => {setSettingOption('INVITE_FRIEND')}}>Invite Friend</button></li>
                <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${changePasswordOptionClassName}`} onClick={() => {setSettingOption('CHANGE_PASSWORD')}}>Change Password</button></li>
                <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${verifyAccountOptionClassName}`} onClick={() => {setSettingOption('VERIFY_ACCOUNT')}}>Verify Account</button></li>
            </ul>

            <div className='my-6'>
                {(() => {
                    switch(settingOption){
                        case 'ACCOUNT':
                            return (
                                <form onSubmit={formSubmitHandler}>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Full Name</label>
                                        <div className='flex justify-between items-center relative'>
                                            <input ref={nameRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="name" type="name" placeholder="Enter your full name" required onInvalid={(e) => {e.preventDefault(); setNameError("Please enter a valid name");}}/>
                                            {nameError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        </div>
                                        {nameError ? <p className="text-sm text-red-600 mt-1">{nameError}</p> : ""}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Email</label>
                                        <div className='flex justify-between items-center relative'>
                                            <input ref={emailRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="email" type="email" placeholder="Enter your email" required onInvalid={(e) => {e.preventDefault(); setEmailError("Please enter a valid email");}}/>
                                            {emailError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        </div>
                                        {emailError ? <p className="text-sm text-red-600 mt-1">{emailError}</p> : ""}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-coolGray-600 font-medium after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="">Phone</label>
                                        <div className='flex justify-between items-center relative'>
                                            <input ref={phoneRef} className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 transition-all" name="phone" type="tel" placeholder="Enter your phone number" pattern = "^([0-9]{10})$" onInvalid={(e) => {e.preventDefault(); setPhoneError("Please enter a valid phone");}}/>
                                            {phoneError ? <span className='absolute right-4'><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        </div>
                                        {phoneError ? <p className="text-sm text-red-600 mt-1">{phoneError}</p> : ""}
                                    </div>
                                    {/* TODO: ADD SUPPORT FOR SAVING CHANGES TO COGNITO USER */}
                                    <button type='submit' className="inline-block py-3 px-7 mt-2 mb-1 w-full text-base text-white font-medium text-center leading-6 bg-loyaltyGold-100 hover:bg-loyaltyGold-200 focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all">TODO: Save Changes</button>
                                    <button className="inline-block py-3 px-7 mt-2 mb-1 w-full text-base text-white font-medium text-center leading-6 bg-gray-400 hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all" onClick={() => {assignValuesToRef();}}>Discard Changes</button>
                                </form>
                            );
                        case 'INVITE_FRIEND':
                            return <h1>TODO: Invite Friend</h1>;//TODO: ADD CODE FOR THESE FEATURES
                        case 'CHANGE_PASSWORD':
                            return <h1>TODO: Change Password</h1>;//TODO: ADD CODE FOR THESE FEATURES
                        case 'VERIFY_ACCOUNT':
                            return <h1>TODO: Verify Account</h1>;//TODO: ADD CODE FOR THESE FEATURES
                        default:
                            return <h1>Settings: NO OPTION SELECTED</h1>;
                    }
                })()}
            </div>

            <BottomNavbar/>
        </section>
    );
}