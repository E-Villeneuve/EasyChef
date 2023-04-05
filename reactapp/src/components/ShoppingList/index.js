import './shop_lst.css';
import  '../../components/globals.css';
import ShopListItem from './ShopListItem';
import AddableShopLstItem from './ShopListItem/AddableShopLstItem';
import ShopAllIngredientsList from './ShopAllIngredientsLst';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ShoppingList() {
    return (
        <div className="shop_wrap">
                <h2 id="shop_title"><b>My Shopping List</b></h2>
                <Form className="d-flex" role="search" id="shop_search">
                    <Form.Control
                        type="search"
                        placeholder = "Add recipes..."
                        aria-label="Add recipes"
                        id="add_recipes"
                    />
                </Form>
                <div id="shop_items">
                {ShopListItem('test')}
                {ShopListItem('test')}
                {ShopListItem('test')}
                {ShopListItem('test')}
                {ShopListItem('test')}
                {ShopListItem('test')}
                <AddableShopLstItem/>
                <div id="allingredientslst">
                    <h4 id="allingredientstitle">All Ingredients</h4>
                    {ShopAllIngredientsList()}
                </div>
                <Button id="export_btn">
                    Export
                </Button>
            </div>
        </div>
    );
  }
  
  export default ShoppingList;