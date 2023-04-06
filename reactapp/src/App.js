import React, { useEffect, createContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import AnimatedRoutes from './components/AnimatedRoutes';
import ToTopBtn from './components/ToTopBtn';
import { useState } from 'react';

import AOS from "aos";

export const AuthContext = createContext(null);

const App = () => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 1000 }); // For component fade in/out, not page
        const checkAuth = () => {
            if (localStorage.getItem('access')) setAuth(true);
            setLoading(false);
        };
        checkAuth();
    }, []);

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
                <NavBar />
                <AnimatedRoutes />
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
