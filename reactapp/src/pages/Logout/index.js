import { Navigate } from "react-router-dom";

function Logout() {

    const logout = () => {
        localStorage.clear();
    }

    return (
        <div id='logout_container'>
            {logout() || (<Navigate to='/login'/>)}
        </div>
    );
  }
  
  export default Logout;