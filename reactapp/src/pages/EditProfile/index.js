import UserEditProfile from '../../components/EditProfile';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AnimatePage from '../../components/AnimatePage';


function EditProfile() {

    const location = useLocation();

    return (localStorage.getItem('access') ?
        (<AnimatePage >
                <UserEditProfile/>
        </AnimatePage>) : (<Navigate to='/unauthorized' state={{path: location.pathname}} />)
    );
  }
  
  export default EditProfile;