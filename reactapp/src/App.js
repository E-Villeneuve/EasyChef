import React, { useEffect, createContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import AnimatedRoutes from './components/AnimatedRoutes';
import ToTopBtn from './components/ToTopBtn';
import { useState } from 'react';
import defavatar from './images/defaultavatar.png';
import LoadingComp from './components/Loading';

import AOS from "aos";

export const UserContext = createContext(null);
export const SearchContext = createContext(null);

const App = () => {
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phoneNum, setPhoneNum] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [description, setDescription] = useState('');
    const [pageLoading, setPageLoading] = useState(false);
    const [auth, setAuth] = useState(false);

    const userStates = {
        auth: auth,
        setAuth: setAuth,
        loading: loading,
        setLoading: setLoading,
        pageLoading: pageLoading,
        setPageLoading: setPageLoading,
        firstName: firstName,
        setFirstName: setFirstName,
        lastName: lastName,
        setLastName: setLastName,
        phoneNum: phoneNum,
        setPhoneNum: setPhoneNum,
        avatar: avatar,
        setAvatar: setAvatar,
        email: email,
        setEmail: setEmail,
        password: password,
        setPassword: setPassword,
        description: description,
        setDescription: setDescription
    }

    const [ searchQ, setSearchQ ] = useState('');
    const [ diets, setDiets ] = useState([]);
    const [ cuisines, setCuisines ] = useState([]);
    const [ timeTags, setTimeTags ] = useState([]);
    const [ searchCats, setSearchCats ] = useState([]);
    const [ ordering, setOrdering ] = useState([]);
    
    const searchStates = {
        searchQ: searchQ,
        setSearchQ: setSearchQ,
        diets: diets,
        setDiets: setDiets,
        cuisines: cuisines,
        setCuisines: setCuisines,
        timeTags: timeTags,
        setTimeTags: setTimeTags,
        searchCats: searchCats,
        setSearchCats: setSearchCats,
        ordering: ordering,
        setOrdering: setOrdering,
    }

    useEffect(() => {
        AOS.init({ duration: 1000 }); // For component fade in/out, not page
        setPageLoading(true);

        setFirstName(localStorage.getItem('first_name'));
        let last_name = localStorage.getItem('last_name');
        setAvatar(localStorage.getItem('avatar') || defavatar);
        setLastName(last_name);
        if (localStorage.getItem('access')) setAuth(true);
        setEmail(localStorage.getItem('email'));
        setPassword(localStorage.getItem('password'));
        setPhoneNum(localStorage.getItem('phone_number'));
        setDescription(localStorage.getItem('description'));

        setPageLoading(false);
    }, [loading, pageLoading, firstName, lastName, phoneNum, avatar, email, password, description]);

    return (
        <>
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
            crossOrigin="anonymous"
        />
            <Router>
                <SearchContext.Provider value={searchStates}>
                    <UserContext.Provider value={userStates}>
                        <NavBar />
                        <AnimatedRoutes />
                    </UserContext.Provider>
                </SearchContext.Provider>
            </Router>
            {loading && <LoadingComp/>}
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
