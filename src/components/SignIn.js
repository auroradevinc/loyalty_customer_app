// React Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, fetchUserFromLocal, signIn } from '../app/authSlice';

// Modules Imports
import { Amplify, Auth } from 'aws-amplify';

// Components Imports

// Other Files Imports

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
                    <div className="column is-6 is-4-desktop mb-5 mr-auto">
                        <div>
                            <div className="mx-auto py-5 has-text-centered">
                                <form onSubmit={formSubmitHandler}>
                                    <span className="has-text-grey-dark">Sign In</span>
                                    <h3 className="mb-5 is-size-4 has-text-weight-bold">Join our community</h3>
                                    <div className="field">
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input" type="text" placeholder="E-mail Address or Phone Number" name="username" ref={usernameRef} required pattern = "^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|(\d{3}-\d{3}-\d{4})$"/>
                                            <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                                            {usernameError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        </div>
                                        <p className="help is-danger has-text-left">{usernameError}</p>
                                    </div>
                                    <div className="field">
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input" type="password" placeholder="Password" name="password" ref={passwordRef} required/>
                                            <span className="icon is-small is-left"><i className="fas fa-lock"></i></span>
                                            {passwordError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                        </div>
                                        <p className="help is-danger has-text-left">{passwordError}</p>
                                    </div>
                                    <button className="button is-primary mb-4 is-fullwidth">Login</button>
                                    <a className="mb-5 is-inline-block" href="#"><small>Forgot password?</small></a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="is-hidden-mobile is-hidden-desktop" style={{position: 'absolute', top: '0', bottom: '0', right: '0', width: '45%', backgroundImage: "url('bulma-plain-assets/images/green-400-square.png')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
            <div className="is-hidden-touch" style={{position: 'absolute', top: '0', bottom: '0', right: '0', width: '50%', backgroundImage: "url('bulma-plain-assets/images/green-400-square.png')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
        </section>
    );
}