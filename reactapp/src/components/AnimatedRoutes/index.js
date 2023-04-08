import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserContext } from '../../App';
import Spinner from 'react-bootstrap/Spinner';
import Home from '../../pages/Home';
import MyShoppingList from '../../pages/MyShoppingList';
import NotFound from '../../pages/NotFound';
import SignUp from '../../pages/SignUp';
import Login from '../../pages/Login';
import EditProfile from '../../pages/EditProfile';
import Unauthorized from '../../pages/Unauthorized';
import Logout from '../../pages/Logout';
import Loading from '../../pages/Loading';

// Idea of separating AnimatedRoutes from App.js from:
// https://www.youtube.com/watch?v=FdrEjwymzdY
function AnimatedRoutes() {
    const location = useLocation();

        // https://stackoverflow.com/questions/70597239/react-how-to-check-if-user-is-still-authenticated
        const AuthRoute = ({children}) => {
            const { auth, loading } = useContext(UserContext);

            if (loading) {
                return <div>
                    <Loading />
                    <Spinner animation="border" />
                    </div>
            }

            return auth ? (
                <div>{children}</div>
            ) : (<Navigate to='/unauthorized' replace state={{path: location.pathname}} />)
        }

    return (
        <AnimatePresence mode="wait" initial={ false }>
            <Routes location={location} key={location.pathname}>
                <Route exact path="" element={<Home/>}/>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/signup" element={<SignUp/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/editprofile" element={<EditProfile/>}/>
                <Route exact path="/logout" element={<Logout/>}/>
                <Route exact path="/unauthorized" element={<Unauthorized/>}/>
                <Route exact path="/myshoppinglist" element={<AuthRoute><MyShoppingList/></AuthRoute>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;