import React, { useEffect, createContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Loading from './pages/Loading';
import AnimatedRoutes from './components/AnimatedRoutes';
import ToTopBtn from './components/ToTopBtn';
import { useState } from 'react';

import AOS from "aos";

export const AuthContext = createContext(null);

const App = () => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [userReady, setUserReady] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 }); // For component fade in/out, not page
        // setLoading(true);
        // setAuth(null);
        // setUserReady(false);

        const checkAuth = () => { // Check if user has authorization
            if (localStorage.getItem('access')) {
                // console.log('first_name checkAuth: ' + localStorage.getItem('first_name'));
                setAuth(true);
            }
            setLoading(false);
        };

        const checkUserInfo = () => { // Check if user has info loaded (if signed in)
            if (auth && (localStorage.getItem('first_name') !== null ||
                localStorage.getItem('last_name') !== null)) {
                // console.log('checkUserInfo: ' + localStorage.getItem('first_name') !== null +
                // localStorage.getItem('last_name') !== null);
                // setUserReady(true);
            }
        }

        // const loadedUser = () => {
        //     if (auth && userReady) setLoading(false);
        // }

        checkAuth();
        checkUserInfo();
        // loadedUser();
        // console.log('access token: ' + (null !== localStorage.getItem('access')));
        // console.log('loading: ' + loading);
        // console.log('auth: ' + auth);
        // console.log('userReady: ' + userReady);
        // console.log('first name: ' + localStorage.getItem('first_name') );
        // console.log('-------------------------')
    }, [auth, loading]);

    // const RouteContainer = ({children}) => {

    //     if (loading) {
    //         return <div>
    //             <Loading />
    //             <Spinner animation="border" />
    //             </div>
    //     }

    //     return <div>{children}</div>
    // }

    return (
        <>
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
            crossOrigin="anonymous"
        />
        <Router>
            <AuthContext.Provider value={{auth: auth, setAuth: setAuth, 
                                          loading: loading, setLoading: setLoading}}>
                {/* <RouteContainer>                          */}
                    <NavBar />
                    <AnimatedRoutes />
                {/* </RouteContainer>   */}
            </AuthContext.Provider>
        </Router>
        <Container id='footer_container'>
        <ToTopBtn/>
        <p id='footer'>  
            Copyright © 2023 Easy Chef Incorporated<br />
            All Rights Reserved
        </p>  
        </Container>
        </>
    );
}

export default App;
