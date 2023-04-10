import './shoppinglist.css';
import  '../../components/globals.css';
import AnimatePage from '../../components/AnimatePage';
import ShoppingList from '../../components/ShoppingList';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function MyShoppingList() {

    const location = useLocation();

    return (localStorage.getItem('access') ?
        (<AnimatePage >
            <div id='shop_page_container'>
                <ShoppingList/>
            </div>
        </AnimatePage>) : (<Navigate to='/unauthorized' state={{path: location.pathname}} />)
    );
  }
  
  export default MyShoppingList;