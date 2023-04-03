import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../../pages/Home';
import MyShoppingList from '../../pages/MyShoppingList';
import NotFound from '../../pages/NotFound';
import SignUp from '../../pages/SignUp';

// Idea of separating AnimatedRoutes from App.js from:
// https://www.youtube.com/watch?v=FdrEjwymzdY
function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait" initial={ false }>
            <Routes location={location} key={location.pathname}>
                <Route exact path="" element={<Home/>}/>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/signup" element={<SignUp/>}/>
                <Route exact path="/myshoppinglist" element={<MyShoppingList/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;