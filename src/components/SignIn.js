// Base Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Modules Imports
import { Amplify, Auth } from 'aws-amplify';

// Components Imports

// Other Files Imports

// Styling Imports
import './SignIn.css';

export function SignIn() {

    useEffect(() => {
        console.log(Amplify);
        async function fetchLocalStorageData() {
          console.log("Trying to Fetch User Data from local storgae if exists");
          try {
              const session = await Auth.currentSession();
              const user = await Auth.currentAuthenticatedUser();
              console.log('- User Fetched',session, user);
          }
          catch (err){
              console.log('- Error Fetching data from local storage', err);
          }
        }
        fetchLocalStorageData();
    }, [])
    
    return (
        <div className=''>
            <h1>
                SignIn
            </h1>
        </div>
    );
}