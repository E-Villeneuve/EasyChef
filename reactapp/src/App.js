import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MyShoppingList from './pages/MyShoppingList';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';

import AOS from "aos";

const App = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
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
        <NavBar />
            <Routes>
                <Route exact path="" element={<Home/>}/>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/myshoppinglist" element={<MyShoppingList/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
        <Container id='footer_container'>
        <p id='footer'>  
            Copyright © 2023 Easy Chef Incorporated<br />
            All Rights Reserved
        </p>  
        </Container>
        </>
    );
}

export default App;
