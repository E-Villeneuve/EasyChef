import UserNavBar from './UserNavBar';
import GuestNavBar from './GuestNavBar';
import { useContext } from 'react';
import { AuthContext } from '../../App';

function NavBar() {
    const { auth } = useContext(AuthContext);

    return (
        <>
        { auth ? (<UserNavBar/>) : (<GuestNavBar/>) }
        </>
    );
}

export default NavBar;