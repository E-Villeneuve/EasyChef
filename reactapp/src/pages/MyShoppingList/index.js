import './shoppinglist.css';
import  '../../components/globals.css';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../App';
import AnimatePage from '../../components/AnimatePage';
import ShoppingList from '../../components/ShoppingList';

function MyShoppingList() {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (!auth) navigate('/unauthorized');
    });

    return (
        <AnimatePage>
            <div id='shop_page_container'>
                <ShoppingList/>
            </div>
        </AnimatePage>
    );
  }
  
  export default MyShoppingList;