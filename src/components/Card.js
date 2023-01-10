// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { appStore, updateActiveNav } from '../app/appSlice';
import { authStore } from '../app/authSlice';
import { customerStore } from '../app/customerSlice';
import { cardStore } from '../app/cardSlice';

// Modules Imports
import QRCode from 'react-qr-code';
import { NavLink, useNavigate } from 'react-router-dom';

// Components Imports
import { BottomNavbar } from './BottomNavbar';

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './Card.css';

export function Card() {
    const app = useSelector(appStore);
    const auth = useSelector(authStore);
    const card = useSelector(cardStore);
    const customer = useSelector(customerStore);
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        console.log("COMPONENT RENDERED: Card");
    }, []);

    useEffect(() => {
        console.log("COMPONENT Card: Updating Active Nav");
        dispatch(updateActiveNav(ROUTES.CARD));
    }, [dispatch]);

    useEffect(() => {
        if(!auth.isAuthenticated) { 
            console.log("COMPONENT Promos: User NOT logged in, Route to Sign In Page");
            navigate(ROUTES.SIGN_IN);
        }
    }, [auth.isAuthenticated]);

    return (
        <section className="bg-white bg-opacity-0 p-2 md:p-6 px-4 pb-6 min-h-[70vh]">
             <div className="container px-4 mx-auto">
                <div className="max-w-lg mx-auto">
                    
                    <div className="mb-7 text-center">
                        <NavLink className="hidden mb-3 sm:inline-block" to={ROUTES.HOME_PAGE}>
                            <img className="h-24" src="./loyalty_logo.png" alt=""/>
                        </NavLink>
                        <h3 className="mb-2 text-2xl text-coolGray-900 md:text-3xl font-bold">Loyalty Card</h3>
                        <p className="text-lg text-coolGray-500 font-medium">Rewards on repeat!</p>
                        <hr className='mt-2 mb-2'/>
                    </div>

                    <div className='relative max-w-min m-auto my-7 p-3 bg-white rounded-md shadow-md '>
                        <img className='absolute top-[-4.5px] right-[-4.5px] h-10' src={card.card.card_corner_image} alt='Card Corner'/>
                        <img className="m-3 my-1 ml-1 h-14" src={card.card.client_image} alt='Business Logo'/>
                        <p className='m-3 mt-1 ml-1 mb-0 text-md font-bold text-loyaltyGold-100'>{customer.customer.full_name}</p>
                        <p className='m-3 mt-0 ml-1 text-xxs text-coolGray-500'>Member since: {customer.customer.member_since_simplified}</p>
                        <div className='p-3 m-auto mt-3 max-w-min border-[1px] border-loyaltyGold-100 shadow-md rounded-md'>
                            <QRCode size={225} value={`https://www.myloyaltycard.ca/scan?card_id=${card.card.card_id}&card_cvc=${card.card.security_code}&scan_type=DIGITAL}`} fgColor="#C9A36B" bgColor="transparent"/>
                        </div>
                        <p className='mt-1 text-xxs text-coolGray-400 text-center'>Scan in restaurant to redeem your promos</p>
                    </div>

                    <BottomNavbar/>
                </div>
            </div>
        </section>
    );
}