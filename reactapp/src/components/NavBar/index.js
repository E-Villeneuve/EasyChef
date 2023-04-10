import UserNavBar from './UserNavBar';
import GuestNavBar from './GuestNavBar';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useState, useEffect } from 'react';

function NavBar() {
    const [navbar, setNavBar] = useState('');
    const { setLoading, email, firstName, lastName, phoneNum, avatar} = useContext(UserContext);

    useEffect(() => {
        setLoading(true);
        setNavBar(localStorage.getItem('access') ? (<UserNavBar/>) : (<GuestNavBar/>))
        setLoading(false);
    }, [setLoading, email, firstName, lastName, phoneNum, avatar])

    return (
        <>
        { navbar }
        </>
    );
}

export default NavBar;