// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { updateActiveNav } from '../app/appSlice';
import axios from 'axios';

// Modules Imports

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './HomePage.css';


// TODO: DELETE THESE TEST REQUESTS HERE & FROM AWS LAMBDA
// const options = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
// const res_get = axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/test`).then((res) => {
//     console.log("AXIOS GET REQUEST RESULT", res, res.data);
// });

// const res_post_1 = axios.post(`${process.env.REACT_APP_AWS_API_GATEWAY}/test`).then((res) => {
//     console.log("AXIOS POST REQUEST 1 RESULT", res, res.data);
// });

// const res_post = axios.post(`${process.env.REACT_APP_AWS_API_GATEWAY}/test`, {key: "value"}).then((res) => {
//     console.log("AXIOS POST REQUEST 2 RESULT", res, res.data);
// });

export function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("COMPONENT RENDERED: HomePage");
    }, []);

    useEffect(() => {
        console.log("COMPONENT HomePage: Updating Active Nav");
        dispatch(updateActiveNav(ROUTES.HOME_PAGE));
    }, [dispatch]);

    return (
        <section className="bg-white bg-opacity-0 p-6 px-4 pb-6 min-h-[70vh]">
            <h3>
                HOME PAGE
            </h3>
        </section>
    );
}