// React Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, fetchUserFromLocal, signIn } from '../app/authSlice';

// Modules Imports
import { NavLink } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './SignIn.css';

export function SignIn() {
    const auth = useSelector(authStore);
    const dispatch = useDispatch();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        console.log("COMPONENT RENDERED: SignIn");
    }, [])

    useEffect(() => {
        dispatch(fetchUserFromLocal());
    }, [dispatch])

    useEffect(() => {
        if(auth.error && auth.error.toLowerCase().includes('username')){ setUsernameError(auth.error) }
        if(auth.error && auth.error.toLowerCase().includes('password')){ setPasswordError(auth.error) }
    }, [auth.error])

    let formSubmitHandler = (event) => {
        event.preventDefault();

        // extract email/phone number from username
        let password = passwordRef.current.value;
        let email, phone = '';
        if (usernameRef.current.value.includes('@')) { email = usernameRef.current.value } else { phone =  usernameRef.current.value }
        
        console.log(`COMPONENT SignIn: SignIn form Submission. Email: ${email}, Phone: ${phone}, Password: ${password}`);

        dispatch(signIn({email, phone, password}));
    }
    
    return (
        <section className="section is-relative">
            <div className="container">
                <div className="columns is-multiline">
                    <div className="column is-12 is-6-desktop mb-5 mr-auto ml-auto box has-background-light pr-6 pl-6">
                        <div>
                            <div className="mx-auto py-5 has-text-centered">
                                <form onSubmit={formSubmitHandler}>
                                    <h3 className="is-size-2 has-text-weight-bold has-text-primary">Welcome Back</h3>
                                    <h3 className="mb-5 has-text-grey-dark">Please Enter your Details</h3>
                                    <div className="field mt-3">
                                        <div className="field-label mb-1">
                                            <label className="label has-text-left has-text-weight-medium">Email or Phone</label>
                                        </div>
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input" type="text" placeholder="Enter your email or phone number" name="username" ref={usernameRef} required pattern = "^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|([0-9]{10})$"/>
                                            <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                                            {usernameError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        </div>
                                        <p className="help is-danger has-text-left">{usernameError}</p>
                                    </div>
                                    <div className="field mt-3">
                                        <div className="field-label mb-1">
                                            <label className="label has-text-left has-text-weight-medium">Password</label>
                                        </div>
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input" type="password" placeholder="Enter your password" name="password" ref={passwordRef} required/>
                                            <span className="icon is-small is-left"><i className="fas fa-lock"></i></span>
                                            {passwordError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        </div>
                                        <p className="help is-danger has-text-left">{passwordError}</p>
                                    </div>
                                    <button className="button is-primary mb-4 is-fullwidth">Sign In</button>
                                    <a className="mb-1 is-size-6 has-text-weight-medium has-text-primary" href="#">Forgot password</a>
                                    <p className="is-size-6">Don't have an account? <NavLink className="has-text-weight-medium has-text-primary" to={ROUTES.SIGN_UP}><span>Sign Up</span></NavLink></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="is-hidden-mobile is-hidden-desktop" style={{position: 'absolute', top: '0', bottom: '0', right: '0', width: '45%', backgroundImage: "url('./bg-1.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
            <div className="is-hidden-touch" style={{position: 'absolute', top: '0', bottom: '0', right: '0', width: '50%', backgroundImage: "url('./bg-1.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div> */}
        </section>
    );
}