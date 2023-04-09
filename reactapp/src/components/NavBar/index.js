import UserNavBar from './UserNavBar';
import GuestNavBar from './GuestNavBar';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useState, useEffect } from 'react';

function NavBar() {
    const [navbar, setNavBar] = useState('');
    const { auth, setLoading, email, firstName, lastName, phoneNum, avatar} = useContext(UserContext);

    useEffect(() => {
        setLoading(true);
        setNavBar(auth ? (<UserNavBar/>) : (<GuestNavBar/>))
        setLoading(false);
    }, [auth, setLoading, email, firstName, lastName, phoneNum, avatar])

    return (
        <>
        { navbar }
        </>
    );
}

export default NavBar;