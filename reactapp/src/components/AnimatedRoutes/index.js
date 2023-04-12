import React, { useContext } from 'react';
import { Route, Routes, useLocation} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserContext } from '../../App';
import Home from '../../pages/Home';
import MyShoppingList from '../../pages/MyShoppingList';
import NotFound from '../../pages/NotFound';
import SignUp from '../../pages/SignUp';
import Login from '../../pages/Login';
import EditProfile from '../../pages/EditProfile';
import Unauthorized from '../../pages/Unauthorized';
import Logout from '../../pages/Logout';
import Loading from '../../pages/Loading';
import AdvancedSearch from '../../pages/AdvancedSearch';
import MyRecipes from '../../pages/MyRecipes';

// Idea of separating AnimatedRoutes from App.js from:
// https://www.youtube.com/watch?v=FdrEjwymzdY
function AnimatedRoutes() {
    const location = useLocation();
    const { pageLoading } = useContext(UserContext);

    if (pageLoading) {
        return <Loading />
    }

    return (
        <AnimatePresence mode="wait" initial={ false }>
            <Routes location={location} key={location.pathname}>
                <Route exact path="" element={<Home/>}/>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/signup" element={<SignUp/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/myrecipes" element={<MyRecipes/>}/>
                <Route exact path="/editprofile" element={<EditProfile/>}/> {/*Needs verification} */}
                <Route exact path="/logout" element={<Logout/>}/>
                <Route exact path="/unauthorized" element={<Unauthorized/>}/>
                <Route exact path="/search" element={<AdvancedSearch/>}>
                    <Route index element={<AdvancedSearch />} />
                    <Route path="*" element={<AdvancedSearch />} />
                </Route>
                <Route exact path="/myshoppinglist" element={<MyShoppingList/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;