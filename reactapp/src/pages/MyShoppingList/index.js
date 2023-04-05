import './shoppinglist.css';
import  '../../components/globals.css';
import AnimatePage from '../../components/AnimatePage';
import ShoppingList from '../../components/ShoppingList';

function MyShoppingList() {

    return (
        <AnimatePage>
            <div id='shop_page_container'>
                <ShoppingList/>
            </div>
        </AnimatePage>
    );
  }
  
  export default MyShoppingList;