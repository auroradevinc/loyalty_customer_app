// React Imports
import React from 'react';
import { useEffect } from 'react';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { authStore, signOut } from '../app/authSlice';

// Modules Imports
import { NavLink, useNavigate } from "react-router-dom";

// Components Imports

// Other Files Imports
import * as ROUTES from '../constants/routes';

// Styling Imports
import './Navbar.css';


export function Navbar_test() {
    const auth = useSelector(authStore);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {

        console.log("COMPONENT RENDERED: NavBar");

        const menus = document.querySelectorAll('.navbar-burger');
        const dropdowns = document.querySelectorAll('.navbar-menu');

        if (menus.length && dropdowns.length) {
            for (var i = 0; i < menus.length; i++) {
                menus[i].addEventListener('click', function() {
                    for (var j = 0; j < dropdowns.length; j++) {
                        dropdowns[j].classList.toggle('is-active');
                    }
                });
            }
        }
    },[])

    useEffect(() => {
        if(!auth.isAuthenticated){ 
          console.log("COMPONENT NavBar: User is not logged in, Route to Home")
          navigate(ROUTES.HOME_PAGE); 
        }
      }, [auth.isAuthenticated])

    return (
        <nav className="navbar py-4">
            <div className="container is-fluid">
                <div className="navbar-brand">
                    <NavLink className="navbar-item" to={ROUTES.HOME_PAGE}>
                        <img className="image" src="./loyalty_logo.png" alt=""/>
                    </NavLink>
                    <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <NavLink className="navbar-item" to={ROUTES.HOME_PAGE}><span>Home</span></NavLink>
                        <NavLink className="navbar-item" to={ROUTES.PROMOS}><span>Your Promos</span></NavLink>
                    </div>

                    {/* Only Show login/register button if user is NOT logged in */}
                    {(!auth.isAuthenticated) ? 
                    <div className="navbar-item">
                        <div className="buttons">
                            <NavLink className="button is-primary" to={ROUTES.SIGN_IN}><span>Sign In</span></NavLink>
                        </div>
                    </div> : ""}

                    {/* Only Show DropDown if user is logged in */}
                    {(auth.isAuthenticated) ?
                    <div className="navbar-item desktop">
                        <div className="dropdown is-right is-hoverable">
                            <div className="dropdown-trigger">
                                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                                <span>
                                    <i className="fa-solid fa-user"></i>
                                </span>
                                <span className="icon is-small">
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                                </button>
                            </div>

                            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                <div className="dropdown-content">
                                    <div className="dropdown-item">
                                        <NavLink to={ROUTES.SETTINGS}><span>Settings</span></NavLink>
                                    </div>
                                    <div className="dropdown-item">
                                        <button className="button is-normal is-primary" onClick={() => dispatch(signOut())}>Sign Out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ""}
                    
                    {/* Mobile version drop navbar show signout only if user is logged in */}
                    {(auth.isAuthenticated) ?
                    <div className="navbar-item mobile">
                        <NavLink to={ROUTES.SETTINGS}><span>Settings</span></NavLink>
                    </div> : ""}

                    {/* Mobile version drop navbar show signout only if user is logged in */}
                    {(auth.isAuthenticated) ?
                    <div className="navbar-item mobile">
                            <button className="button is-normal is-primary" onClick={() => dispatch(signOut())}>Log Out</button>
                    </div>  : ""}
                </div>
            </div>
        </nav>

            // <section className="section is-relative">
        //     <div className="container">
        //         <div className="columns is-multiline">
        //             <div className="column is-12 is-6-desktop mb-5 mr-auto ml-auto box has-background-light pr-6 pl-6">
        //                 <div>
        //                     <div className="mx-auto py-5 has-text-centered">
        //                         <form onSubmit={formSubmitHandler}>
        //                             <h3 className="is-size-2 has-text-weight-bold has-text-primary">Welcome Back</h3>
        //                             <h3 className="mb-5 has-text-grey-dark">Please Enter your Details</h3>
        //                             <div className="field mt-3">
        //                                 <div className="field-label mb-1">
        //                                     <label className="label has-text-left has-text-weight-medium">Email or Phone</label>
        //                                 </div>
        //                                 <div className="control has-icons-left has-icons-right">
        //                                     <input className="input" type="text" placeholder="Enter your email or phone number" name="username" ref={usernameRef} required pattern = "^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|([0-9]{10})$"/>
        //                                     <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
        //                                     {usernameError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
        //                                 </div>
        //                                 <p className="help is-danger has-text-left">{usernameError}</p>
        //                             </div>
        //                             <div className="field mt-3">
        //                                 <div className="field-label mb-1">
        //                                     <label className="label has-text-left has-text-weight-medium">Password</label>
        //                                 </div>
        //                                 <div className="control has-icons-left has-icons-right">
        //                                     <input className="input" type="password" placeholder="Enter your password" name="password" ref={passwordRef} required/>
        //                                     <span className="icon is-small is-left"><i className="fas fa-lock"></i></span>
        //                                     {passwordError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
        //                                 </div>
        //                                 <p className="help is-danger has-text-left">{passwordError}</p>
        //                             </div>
        //                             <button className="button is-primary mb-4 is-fullwidth">Sign In</button>
        //                             <a className="mb-1 is-size-6 has-text-weight-medium has-text-primary" href="#">Forgot password</a>
        //                             <p className="is-size-6">Don't have an account? <NavLink className="has-text-weight-medium has-text-primary" to={ROUTES.SIGN_UP}><span>Sign Up</span></NavLink></p>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     {/* <div className="is-hidden-mobile is-hidden-desktop" style={{position: 'absolute', top: '0', bottom: '0', right: '0', width: '45%', backgroundImage: "url('./bg-1.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
        //     <div className="is-hidden-touch" style={{position: 'absolute', top: '0', bottom: '0', right: '0', width: '50%', backgroundImage: "url('./bg-1.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div> */}
        // </section>


        // <section className="section is-relative">
        //       <div className="container">
        //           <div className="columns is-multiline">
        //               <div className="column is-12 is-6-desktop mb-5 mr-auto ml-auto box has-background-light pr-6 pl-6">
        //                   <div>
        //                       <div className="mx-auto py-5 has-text-centered">
        //                           <form onSubmit={formSubmitHandler}>
        //                               <h3 className="is-size-2 has-text-weight-bold has-text-primary">Welcome</h3>
        //                               <h3 className="mb-5 has-text-grey-dark">Please Enter your Details to Register</h3>
        //                               <div className="field mt-3">
        //                                   <div className="field-label mb-1">
        //                                       <label className="label has-text-left has-text-weight-medium">First Name*</label>
        //                                   </div>
        //                                   <div className="control has-icons-left has-icons-right">
        //                                       <input className="input" type="text" placeholder="Enter your first name" name="fname" ref={givenNameRef} required/>
        //                                       <span className="icon is-small is-left"><i className="fa-solid fa-marker"></i></span>
        //                                       {givenNameError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
        //                                   </div>
        //                                   <p className="help is-danger has-text-left">{givenNameError}</p>
        //                               </div>
        //                               <div className="field mt-3">
        //                                   <div className="field-label mb-1">
        //                                       <label className="label has-text-left has-text-weight-medium">Middle Name</label>
        //                                   </div>
        //                                   <div className="control has-icons-left has-icons-right">
        //                                       <input className="input" type="text" placeholder="Enter your middle name" name="mname" ref={middleNameRef}/>
        //                                       <span className="icon is-small is-left"><i className="fa-solid fa-marker"></i></span>
        //                                       {middleNameError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
        //                                   </div>
        //                                   <p className="help is-danger has-text-left">{middleNameError}</p>
        //                               </div>
        //                               <div className="field mt-3">
        //                                   <div className="field-label mb-1">
        //                                       <label className="label has-text-left has-text-weight-medium">Last Name*</label>
        //                                   </div>
        //                                   <div className="control has-icons-left has-icons-right">
        //                                       <input className="input" type="text" placeholder="Enter your last name" name="lname" ref={familyNameRef} required/>
        //                                       <span className="icon is-small is-left"><i className="fa-solid fa-marker"></i></span>
        //                                       {familyNameError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
        //                                   </div>
        //                                   <p className="help is-danger has-text-left">{familyNameError}</p>
        //                               </div>
        //                               <div className="field mt-3">
        //                                   <div className="field-label mb-1">
        //                                       <label className="label has-text-left has-text-weight-medium">Email*</label>
        //                                   </div>
        //                                   <div className="control has-icons-left has-icons-right">
        //                                       <input className="input" type="email" placeholder="Enter your email" name="email" ref={emailRef} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}"/>
        //                                       <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
        //                                       {emailError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
        //                                   </div>
        //                                   <p className="help is-danger has-text-left">{emailError}</p>
        //                               </div>
        //                               <div className="field mt-3">
        //                                   <div className="field-label mb-1">
        //                                       <label className="label has-text-left has-text-weight-medium">Phone*</label>
        //                                   </div>
        //                                   <div className="control has-icons-left has-icons-right">
        //                                       <input className="input" type="tel" placeholder="Enter your phone number" name="phone" ref={phoneRef} required pattern="[0-9]{10}" inputMode="decimal"/>
        //                                       <span className="icon is-small is-left"><i className="fa-solid fa-phone"></i></span>
        //                                       {phoneError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
        //                                   </div>
        //                                   <p className="help is-danger has-text-left">{phoneError}</p>
        //                               </div>
        //                               <div className="field mt-3">
        //                                   <div className="field-label mb-1">
        //                                       <label className="label has-text-left has-text-weight-medium">Password*</label>
        //                                   </div>
        //                                   <div className="control has-icons-left has-icons-right">
        //                                       <input className="input" type="password" placeholder="Enter your password" name="password" ref={passwordRef} required/>
        //                                       <span className="icon is-small is-left"><i className="fas fa-lock"></i></span>
        //                                       {passwordError ? <span className="icon is-small is-right"><i className="fa-solid fa-exclamation" style={{color: '#F14668'}}></i></span> : ""}
        //                                   </div>
        //                                   <p className="help is-danger has-text-left">{passwordError}</p>
        //                               </div>
        //                               <button className="button is-primary mb-4 is-fullwidth">Sign Up</button>
        //                               <p className="is-size-6">Already have an account? <NavLink className="has-text-weight-medium has-text-primary" to={ROUTES.SIGN_IN}><span>Sign In</span></NavLink></p>
        //                           </form>
        //                       </div>
        //                   </div>
        //               </div>
        //           </div>
        //       </div>
        //       {/* <div className="is-hidden-mobile is-hidden-desktop" style={{position: 'absolute', top: '0', bottom: '0', right: '0', width: '45%', backgroundImage: "url('./bg-1.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
        //       <div className="is-hidden-touch" style={{position: 'absolute', top: '0', bottom: '0', right: '0', width: '50%', backgroundImage: "url('./bg-1.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div> */}
        //   </section>
    );
}