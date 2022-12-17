// Base Imports
import React from 'react';
import { useEffect, useState, useRef } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, fetchUserFromLocal, signUp } from '../app/authSlice';

// Modules Imports
import { NavLink } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './SignUp.css';

export function SignUp() {

  const auth = useSelector(authStore);
  const dispatch = useDispatch();

  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const givenNameRef = useRef();
  const middleNameRef = useRef();
  const familyNameRef = useRef();

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [givenNameError, setGivenNameError] = useState('');
  const [middleNameError, setMiddleNameError] = useState('');
  const [familyNameError, setFamilyNameError] = useState('');

  useEffect(() => {
    console.log("COMPONENT RENDERED: SignUp");
  }, [])

  useEffect(() => {
    dispatch(fetchUserFromLocal());
  }, [dispatch])

  useEffect(() => {
    if(auth.error && auth.error.toLowerCase().includes('email')){ setEmailError(auth.error) }
    if(auth.error && auth.error.toLowerCase().includes('phone')){ setPhoneError(auth.error) }
    if(auth.error && auth.error.toLowerCase().includes('password')){ setPasswordError(auth.error) }
    if(auth.error && auth.error.toLowerCase().includes('name')){ setGivenNameError(auth.error) }
    if(auth.error && auth.error.toLowerCase().includes('name')){ setMiddleNameError(auth.error) }
    if(auth.error && auth.error.toLowerCase().includes('name')){ setFamilyNameError(auth.error) }
}, [auth.error])

  let formSubmitHandler = (event) => {
    event.preventDefault();

    console.log(emailRef, phoneRef, passwordRef, givenNameRef, middleNameRef, familyNameRef);

    let email = emailRef.current.value;
    let phone = phoneRef.current.value;
    let password = passwordRef.current.value;
    let given_name = givenNameRef.current.value;
    let middle_name = middleNameRef.current.value;
    let family_name = familyNameRef.current.value;

    console.log(`COMPONENT SignUp: SignUp form Submission. Email: ${email}, Phone: ${phone}, Password: ${password}, Name: ${given_name} ${middle_name} ${family_name}`);

    // dispatch(signUp({email, phone, password, given_name, middle_name, family_name}));
}


  return (

    <section className="section is-relative">
          <div className="container">
              <div className="columns is-multiline">
                  <div className="column is-12 is-6-desktop mb-5 mr-auto ml-auto box has-background-light pr-6 pl-6">
                      <div>
                          <div className="mx-auto py-5 has-text-centered">
                              <form onSubmit={formSubmitHandler}>
                                  <h3 className="is-size-2 has-text-weight-bold has-text-primary">Welcome</h3>
                                  <h3 className="mb-5 has-text-grey-dark">Please Enter your Details to Register</h3>
                                  <div className="field mt-3">
                                      <div className="field-label mb-1">
                                          <label className="label has-text-left has-text-weight-medium">First Name*</label>
                                      </div>
                                      <div className="control has-icons-left has-icons-right">
                                          <input className="input" type="text" placeholder="Enter your first name" name="fname" ref={givenNameRef} required/>
                                          <span className="icon is-small is-left"><i className="fa-solid fa-marker"></i></span>
                                          {givenNameError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                      </div>
                                      <p className="help is-danger has-text-left">{givenNameError}</p>
                                  </div>
                                  <div className="field mt-3">
                                      <div className="field-label mb-1">
                                          <label className="label has-text-left has-text-weight-medium">Middle Name</label>
                                      </div>
                                      <div className="control has-icons-left has-icons-right">
                                          <input className="input" type="text" placeholder="Enter your middle name" name="mname" ref={middleNameRef}/>
                                          <span className="icon is-small is-left"><i className="fa-solid fa-marker"></i></span>
                                          {middleNameError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                      </div>
                                      <p className="help is-danger has-text-left">{middleNameError}</p>
                                  </div>
                                  <div className="field mt-3">
                                      <div className="field-label mb-1">
                                          <label className="label has-text-left has-text-weight-medium">Last Name*</label>
                                      </div>
                                      <div className="control has-icons-left has-icons-right">
                                          <input className="input" type="text" placeholder="Enter your last name" name="lname" ref={familyNameRef} required/>
                                          <span className="icon is-small is-left"><i className="fa-solid fa-marker"></i></span>
                                          {familyNameError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                      </div>
                                      <p className="help is-danger has-text-left">{familyNameError}</p>
                                  </div>
                                  <div className="field mt-3">
                                      <div className="field-label mb-1">
                                          <label className="label has-text-left has-text-weight-medium">Email*</label>
                                      </div>
                                      <div className="control has-icons-left has-icons-right">
                                          <input className="input" type="email" placeholder="Enter your email" name="email" ref={emailRef} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}"/>
                                          <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                                          {emailError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                      </div>
                                      <p className="help is-danger has-text-left">{emailError}</p>
                                  </div>
                                  <div className="field mt-3">
                                      <div className="field-label mb-1">
                                          <label className="label has-text-left has-text-weight-medium">Phone*</label>
                                      </div>
                                      <div className="control has-icons-left has-icons-right">
                                          <input className="input" type="tel" placeholder="Enter your phone number" name="phone" ref={phoneRef} required pattern="[0-9]{10}" inputMode="decimal"/>
                                          <span className="icon is-small is-left"><i className="fa-solid fa-phone"></i></span>
                                          {phoneError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                      </div>
                                      <p className="help is-danger has-text-left">{phoneError}</p>
                                  </div>
                                  <div className="field mt-3">
                                      <div className="field-label mb-1">
                                          <label className="label has-text-left has-text-weight-medium">Password*</label>
                                      </div>
                                      <div className="control has-icons-left has-icons-right">
                                          <input className="input" type="password" placeholder="Enter your password" name="password" ref={passwordRef} required/>
                                          <span className="icon is-small is-left"><i className="fas fa-lock"></i></span>
                                          {passwordError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
                                      </div>
                                      <p className="help is-danger has-text-left">{passwordError}</p>
                                  </div>
                                  <button className="button is-primary mb-4 is-fullwidth">Sign Up</button>
                                  <p className="is-size-6">Already have an account? <NavLink className="has-text-weight-medium has-text-primary" to={ROUTES.SIGN_IN}><span>Sign In</span></NavLink></p>
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