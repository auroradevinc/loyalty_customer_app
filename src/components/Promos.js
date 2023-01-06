// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveNav } from '../app/appSlice';
import { authStore } from '../app/authSlice';
import { customerStore, getCustomerFromDB } from '../app/customerSlice';
import { cardStore, getCardFromDB } from '../app/cardSlice';
import { promoStore, getPromoFromDB } from '../app/promoSlice';

// Modules Imports
import { useNavigate } from 'react-router-dom';

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './Promos.css';

export function Promos() {
    const auth = useSelector(authStore);
    const customer = useSelector(customerStore);
    const card  = useSelector(cardStore);
    const promo = useSelector(promoStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [promoOption, setPromoOption] = useState('ALL');
    const [onlyForYouOptionClassName, setOnlyForYouOptionClassName] = useState('');
    const [allOptionClassName, setAllOptionClassName] = useState('');
    const [todaysTopOptionClassName, setTodaysTopOptionClassName] = useState('');
    const [bestDealOptionClassName, setBestDealOptionClassName] = useState('');

    const [promos, setPromos] = useState();

    useEffect(() => {
        console.log("COMPONENT RENDERED: Promos");
    }, [])

    useEffect(() => {
        dispatch(updateActiveNav(ROUTES.PROMOS));
    }, [dispatch])

    useEffect(() => {
        if(!auth.isAuthenticated) { 
            console.log("COMPONENT Promos: User NOT logged in, Route to Sign In Page");
            navigate(ROUTES.SIGN_IN);
        }

        if(auth.isAuthenticated && !customer.hasCustomerExtractedFromDB) { 
            console.log("COMPONENT Promos: Customer Data from DB unavailable, Get Customer Data from DB");
            let data = {
                customer: {
                    id: auth.user.sub
                }
            };
            dispatch(getCustomerFromDB(data));
        }

        if(customer.hasCustomerExtractedFromDB && !card.hasCardExtractedFromDB) { 
            console.log("COMPONENT Promos: Customer Data from DB available, Card Data from db unavailable, Get Card Data from DB");
            let data = {
                customer: {
                    id: customer.customer.customer_id,
                }
            };
            dispatch(getCardFromDB(data));
        }

        if(card.hasCardExtractedFromDB && !promo.hasExtractedPromoFromDB) {
            console.log("COMPONENT Promos: Card Data from db available, Get Promo Data from DB");
            let data = {
                card: {
                    id: card.card.card_id,
                }
            };
            dispatch(getPromoFromDB(data));
        }

    }, [auth.hasLocalFetched, auth.isAuthenticated, customer.hasCustomerExtractedFromDB, card.hasCardExtractedFromDB])

    useEffect(() => {
        let active_option = '!text-loyaltyGold-200 !border-b-2 !border-loyaltyGold-200';
        let inactive_option = '!border-b-2 !border-transparent';
        switch (promoOption) {
            case 'ONLY_FOR_YOU':
                console.log("COMPONENT Promos: ONLY_FOR_YOU Option Selected");
                setOnlyForYouOptionClassName(active_option);
                setAllOptionClassName(inactive_option);
                setTodaysTopOptionClassName(inactive_option);
                setBestDealOptionClassName(inactive_option);
                break;
            case 'ALL':
                console.log("COMPONENT Promos: ALL Option Selected");
                setOnlyForYouOptionClassName(inactive_option);
                setAllOptionClassName(active_option);
                setTodaysTopOptionClassName(inactive_option);
                setBestDealOptionClassName(inactive_option);
                break;
            case 'TODAYS_TOP':
                console.log("COMPONENT Promos: TODAYS_TOP Option Selected");
                setOnlyForYouOptionClassName(inactive_option);
                setAllOptionClassName(inactive_option);
                setTodaysTopOptionClassName(active_option);
                setBestDealOptionClassName(inactive_option);
                break;
            case 'BEST_DEAL':
                console.log("COMPONENT Promos: BEST_DEAL Option Selected");
                setOnlyForYouOptionClassName(inactive_option);
                setAllOptionClassName(inactive_option);
                setTodaysTopOptionClassName(inactive_option);
                setBestDealOptionClassName(active_option);
                break;
            default:
                console.log("COMPONENT Promos: No option selected");
                setOnlyForYouOptionClassName(inactive_option);
                setAllOptionClassName(inactive_option);
                setTodaysTopOptionClassName(inactive_option);
                setBestDealOptionClassName(inactive_option);
                break;
        }
        if(promo.hasExtractedPromoFromDB){
            console.log("COMPONENT Promos: PromoOption set, Promos data from db available, Set Promos");
            setAndAddPromos(promoOption);
        }
    }, [promoOption, promo.hasExtractedPromoFromDB])

    let setAndAddPromos = (option) => {
        let promo_list
        if(option === 'ALL'){ promo_list = promo.promo.all_promo }
        if(option === "ONLY_FOR_YOU"){ promo_list = promo.promo.custom_promo }

        setPromos(promo_list.map((promo, index) => {
            return (
                <div key={index} className="w-full max-w-md md:w-[46%] lg:w-[30%] mb-5 mr-0 md:mr-5 p-5 border-[1px] bg-white border-coolGray-100 rounded-md shadow-md hover:shadow-lg cursor-pointer transition-all">
                    <img className="object-fit h-52 w-full mb-3 rounded-md shadow-md" src={`./business-promos/${promo.promo_image}.png`} alt='Promo'/>
                    
                    <div className='flex flex-col justify-between items-center'>
                        <p className='mb-0 text-xxs font-regular text-coolGray-600'>{`Enjoy`}</p>
                        <p className='mb-2 text-md text-center font-semibold text-coolGray-600'>{`${promo.promo_name}`}</p>

                        <div className='p-1 px-2 bg-[#f8e7cd] rounded-md'>
                            {(promo.date_validity_simplified) ? 
                                <p className='text-xxs font-bold text-loyaltyGold-200'>{promo.date_validity_simplified}</p>
                                :
                                <p className='text-xxs font-bold text-loyaltyGold-200'>{`${promo.date_valid_from_simplified} - ${promo.date_valid_to_simplified}`}</p>
                            }
                        </div>
                    </div>
                    
                    <hr className='my-3'/>
                    
                    <div className='flex items-center'>
                        <img className="mr-5 p-1 h-14 md:h-20 lg:h-24 border-2 border-double border-loyaltyGold-100 shadow-md rounded-full" src={`./business-logos/${promo.bus_name}.png`} alt='Business Logo'/>
                        <div>
                            <p className='mb-1 text-md text-loyaltyGold-100 font-semibold'>{promo.bus_name}</p> 
                            <p className='text-xs'>by {promo.client_name}</p>
                        </div>
                    </div>
                </div>
            )
        }));
    }
    
    return (
        <section className="bg-white bg-opacity-0 p-6 px-4 pb-6 min-h-[70vh]">
            <div className="flex flex-wrap items-center justify-between pb-6">
                <div className="w-auto px-4 pl-0">
                    <h2 className="text-2xl font-semibold text-loyaltyGold-100">Promos</h2>
                </div>                
            </div>

            <ul className="flex flex-nowrap overflow-x-auto whitespace-nowrap border-b border-coolGray-200">
                {(promo.hasExtractedPromoFromDB && promo.promo.custom_promo.length > 0) ?
                    <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${onlyForYouOptionClassName}`} onClick={() => {setPromoOption('ONLY_FOR_YOU')}}>Your Specials</button></li>
                    : ""
                }
                <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${allOptionClassName}`} onClick={() => {setPromoOption('ALL')}}>All</button></li>
                {/* TODO: AFTER MVP */}
                {/* <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${todaysTopOptionClassName}`} onClick={() => {setPromoOption('TODAYS_TOP')}}>Today's Top</button></li> */}
                {/* <li><button className={`block px-4 pb-4 text-sm font-medium text-coolGray-600 hover:text-loyaltyGold-100 hover:border-loyaltyGold-100 transition-all ${bestDealOptionClassName}`} onClick={() => {setPromoOption('BEST_DEAL')}}>Best Deal</button></li> */}
            </ul>

            <div className='my-6 mt-8 flex flex-wrap'>
                {(promoOption && promo.hasExtractedPromoFromDB && promos) ? 
                    promos 
                    : "Loading..."
                }
            </div>
        </section>
    );
}