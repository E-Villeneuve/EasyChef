import UserMyRecipes from '../../components/MyRecipes';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import AnimatePage from '../../components/AnimatePage';


function MyRecipes() {

    const location = useLocation();

    return (localStorage.getItem('access') ?
        (<AnimatePage >
                <UserMyRecipes/>
        </AnimatePage>) : (<Navigate to='/unauthorized' state={{path: location.pathname}} />)
    );
  }
  
  export default MyRecipes;