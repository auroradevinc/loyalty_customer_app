// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore, updateActiveNav } from '../app/appSlice';
import { cardStore } from '../app/cardSlice';

// Modules Imports
import CopyToClipboard from 'copy-to-clipboard';
import { NavLink } from 'react-router-dom';

// Components Imports
import { BottomNavbar } from './BottomNavbar';

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './InviteFriend.css';

export function InviteFriend() {
    const app = useSelector(appStore);
    const card = useSelector(cardStore);
    const dispatch = useDispatch();

    const [hasCopied, setHasCopied] = useState(false);
    const [hasNavigator, setHasNavigator] = useState(false);

    useEffect(() => {
        console.log("COMPONENT RENDERED: InviteFriend");

        if (navigator.share) { setHasNavigator(true); }
    }, [])

    useEffect(() => {
        dispatch(updateActiveNav(ROUTES.INVITE_FRIEND));
    }, [dispatch])

    let handleCopy = () => {
        CopyToClipboard(card.card.invite_link); 
        setHasCopied(true);
    }

    let handleShare = () => {
        navigator.share({
            title: 'My Loyalty: Invite a Friend',
            url: `/sign-up?invite_code=${card.card.invite_code}`,
        });
    }

    return (
        <section className="bg-white bg-opacity-0 p-2 md:p-6 px-4 pb-6 min-h-[70vh]">
             <div className="container px-0 mx-auto">
                <div className="max-w-lg mx-auto">
                    
                    <div className="mb-7 text-center">
                        <NavLink className="hidden mb-3 sm:inline-block" to={ROUTES.HOME_PAGE}>
                            <img className="h-24" src="./loyalty_logo.png" alt=""/>
                        </NavLink>
                        <h3 className="mb-2 text-2xl text-coolGray-900 md:text-3xl font-bold">Invite a Friend</h3>
                        <p className="text-lg text-coolGray-500 font-medium">Invite your friends and unlock even more rewards!</p>
                        <hr className='mt-2 mb-2'/>
                    </div>

                    <div className="flex flex-col items-center m-auto my-7 bg-white p-3 md:p-5 rounded-md shadow-md">
                        <div className='flex items-center w-full p-2 justify-between border-[1.5px] border-coolGray-300 rounded-md'>
                            <p className='px-3 pl-0 truncate text-coolGray-500 text-md'>{card.card.invite_link}</p>
                            <button className={`px-3 py-1 border-l-[1.5px] min-w-[103px] hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 font-medium transition-all ${hasCopied ? 'text-loyaltyGold-100 border-loyaltyGold-100' : 'text-coolGray-500 border-coolGray-300'}`} onClick={handleCopy}>
                                <i className={`fa-regular fa-copy mr-2`}></i>
                                {(hasCopied) ? "Copied" : "Copy"}
                                </button>
                        </div>
                        {(hasNavigator) ? 
                            <div>
                                <p className='my-3 text-md text-coolGray-500'>Or</p>
                                <button className='py-2 px-4 w-full text-md leading-5 text-white bg-loyaltyGold-100 hover:bg-loyaltyGold-200 font-medium text-center focus:ring-2 focus:ring-loyaltyGold-100 focus:ring-opacity-50 rounded-md shadow-md hover:shadow-lg transition-all' onClick={handleShare}><i className="fa-solid fa-up-right-from-square mr-2"></i>Share</button>
                            </div>
                            : ""
                        }
                    </div>

                    <BottomNavbar/>
                </div>
            </div>
        </section>
    );
}