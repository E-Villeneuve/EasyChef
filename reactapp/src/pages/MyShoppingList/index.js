import './shoppinglist.css';
import  '../../components/globals.css';
import ShopListItem from '../../components/ShopListItem';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function MyShoppingList() {
    return (
        <>
            <div class="shop_wrap">
                <div class="shop_title_bar">
                    <h2 id="shop_title"><b>My Shopping List</b></h2>
                    <Form className="d-flex" role="search" id="shop_search">
                        <Form.Control
                            type="search"
                            placeholder = "Add recipes..."
                            className = "me-2"
                            aria-label="Add recipes"
                            id="add_recipes"
                        />
                        <Button variant="outline-success" id="search_btn">Search</Button>
                    </Form>
                </div>
                    <div id="shop_items">
                    {ShopListItem('test')}
                    {ShopListItem('test')}
                        <div class="container-lg">
                            <button type="button" class="btn card shop_item" id="last_item">
                                <div class="plus radius">
                                </div>
                            </button>
                        </div>
                        <div id="allingredientslst">
                            <h4 id="allingredientstitle">All Ingredients</h4>
                            <ul>
                                <li><p>1 tablespoon of ketchup</p></li>
                                <li><p>1/2 teaspoons of chipotle</p></li>
                                <li><p>2 slices of sourdough bread</p></li>
                                <li><p>2 slices of cheddar</p></li>
                                <li><p>4 tablespoons of unsalted butter</p></li>
                                <li><p>1 slice of bacon</p></li>
                                <li><p>4 eggs</p></li> 
                                <li><p>Kosher salt and black pepper</p></li>
                                <li><p>1 tablespoon of sour cream</p></li>
                                <li><p>1 tablespoon of chives</p></li> 
                            </ul>
                        </div>
                        <button class="btn btn-secondary" type="button" aria-expanded="false" id="export_btn">
                            Export
                        </button>
                    </div>
                </div>
            </>
    );
  }
  
  export default MyShoppingList;