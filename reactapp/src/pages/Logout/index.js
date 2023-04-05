import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../App';

function Logout() {
    const { setAuth } = useContext(AuthContext);

    const logout = () => {
        localStorage.clear();
        setAuth(false);
    }

    return (
        <div id='logout_container'>
            {logout() || (<Navigate to='/login'/>)}
        </div>
    );
  }
  
  export default Logout;