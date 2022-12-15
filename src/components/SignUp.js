// Base Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Modules Imports
import { Auth } from 'aws-amplify';

// Components Imports

// Other Files Imports

// Styling Imports
import './SignUp.css';

export function SignUp() {
    // useEffect(() => {
    //     async function signUp() {
    //         console.log("Try SignUp")
    //         var given_name = "first_name"
    //         var middle_name = "middle_name"
    //         var family_name = "last_name"
    //         var password = "password_test"
    //         var email = "test_user@gmail.com"
    //         var phone = "+17787512337"

    //         const signUpResponse = await Auth.signUp({
    //             username: email,
    //             password,
    //             attributes: {
    //                 email,
    //                 given_name,
    //                 middle_name,
    //                 family_name,
    //                 phone_number: phone
    //             } 
    //         });
    //         console.log('SignUpResponse', signUpResponse);
    //     }
    //     async function signIn() {
    //         console.log("Try SignIn")

    //         var password = "password_test"
    //         var email = "test_user@gmail.com"
    //         const signUpResponse = await Auth.signIn({username: email, password});
    //         console.log('SignUpResponse', signUpResponse);
    //     }
    //     async function confirmAccount() {
    //         console.log("Try Confirming Account")

    //         var password = "password_test"
    //         var email = "test_user@gmail.com"
    //         var code = "354171";
    //         const signUpResponse = await Auth.confirmSignUp(email, code);
    //         console.log('SignUpResponse', signUpResponse);
    //     }
    //     async function signOut() {
    //         console.log("Try SignOut")

    //         const signUpResponse = await Auth.signOut();
    //         console.log('SignUpResponse', signUpResponse);
    //     }
    //     //signUp();
    //     //confirmAccount();
    //     //signIn();
    //     //signOut();
        
    // }, [])

    return (
        //<section id='sign-up' className='hero is-fullheight-with-navbar'>
            // <div id='signup' className='container'>
            //     <div className='columns'>
            //         <div className='column'>
            //             <div className='container authentication'>
            //                 <h1 className="title">
            //                     Welcome back
            //                 </h1>
            //                 <p className="subtitle">
            //                     Welcome back! Please enter your details to login
            //                 </p>
            //                 <div className="field">
            //                     <label className="label">Name</label>
            //                     <div className="control">
            //                         <input className="input" type="text" placeholder="Text input"/>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div className='column desktop bg-image'></div>
            //     </div>
            // </div>
        //</section>

        <section className="section is-relative is-clipped">
  <div className="is-hidden-touch has-background-primary" ></div>
  <div className="is-hidden-desktop has-background-primary is-fullwidth"></div>
  <div className="container mx-auto is-relative">
    <div className="is-vcentered columns is-multiline">
      <div className="column is-6 is-5-desktop mb-5">
        <div>
          <h2 className="has-text-white mb-4 is-size-1 is-size-3-mobile has-text-weight-bold">Lorem ipsum dolor sit amet consectutar domor at elis</h2>
          <p className="has-text-white mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci.</p>
        </div>
      </div>
      <div className="column is-6 is-4-desktop mx-auto">
        <div className="box has-background-light has-text-centered">
          <form action="#">
            <span className="has-text-grey-dark">Sign In</span>
            <h3 className="mb-5 is-size-4 has-text-weight-bold">Join our community</h3>
            <div className="field">
              <div className="control">
                <input className="input" type="email" placeholder="E-mail address"/>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input" type="password" placeholder="Password"/>
              </div>
            </div>
            <button className="button is-primary mb-4 is-fullwidth">Get Started</button>
            <a className="mb-4 is-inline-block" href="#"><small>Forgot password?</small></a>
            <a className="button is-white mb-2 is-flex is-justify-content-center is-align-items-center is-fullwidth" href="#">
              {/* <img className="image mr-2" style="height: 24px" src="bulma-plain-assets/socials/facebook.svg" alt=""/> */}
              <span className="has-text-grey-dark">Sign in with Facebook</span>
            </a>
            <a className="button is-white mb-2 is-flex is-justify-content-center is-align-items-center is-fullwidth" href="#">
              {/* <img className="image mr-2" style="height: 24px" src="bulma-plain-assets/socials/twitter.svg" alt=""/> */}
              <span className="has-text-grey-dark">Sign in with Twitter</span>
            </a>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
    );
}