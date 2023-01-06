// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore, updateActiveNav } from '../app/appSlice';

// Modules Imports

// Components Imports
import { BottomNavbar } from './BottomNavbar';

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './InviteFriend.css';

export function InviteFriend() {
    const app = useSelector(appStore);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("COMPONENT RENDERED: InviteFriend");
    }, [])

    useEffect(() => {
        dispatch(updateActiveNav(ROUTES.INVITE_FRIEND));
    }, [dispatch])

    return (
        <section className="bg-white bg-opacity-0 p-2 md:p-6 px-4 pb-6 min-h-[70vh]">
            <div className="flex flex-wrap items-center justify-between pb-6">
                <div className="w-auto px-4 pl-0">
                    <h2 className="text-2xl font-semibold text-loyaltyGold-100">Invite a Friend</h2>
                </div>                
            </div>
            <BottomNavbar/>
        </section>
    );
}