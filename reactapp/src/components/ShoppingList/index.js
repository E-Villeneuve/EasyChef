import './shop_lst.css';
import  '../../components/globals.css';
import ShopListItem from './ShopListItem';
import AddableShopLstItem from './ShopListItem/AddableShopLstItem';
import ShopAllIngredientsList from './ShopAllIngredientsLst';
import Search from '../Search';
import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';

function ShoppingList() {

    // Some help w/ states and on funcs
    // from https://www.youtube.com/watch?v=EpE6TU58cPw
    const [value, setValue] = useState('');

    const autocompleteRef = useRef();

    const onChange = (e, setsuggests, setshow) => {
        setValue(e.target.value);
        let request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        }
        fetch("http://127.0.0.1:8000/search/?search=" + e.target.value, request)
        .then(response => response.json()
        .then(data => ({
            data: data,
            response: response
        })
        ).then(res => {
            setsuggests(res.data.results);}));
            setshow(true);
        // api to fetch search result 
    }

    return (
        <div className="shop_wrap" ref={autocompleteRef}>
            <div id='searchsec'>
                <h2 id="shop_title"><b>My Shopping List</b></h2>
                {Search(onChange, 'Add recipes...', 'shop_search')}
            </div>
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


//   <div id='searchsec'>
//                 <Form className="d-flex" role="search" id="shop_search">
//                     <Form.Control
//                         type="search"
//                         placeholder = "Add recipes..."
//                         aria-label="Add recipes"
//                         id="add_recipes"
//                         onChange={onChange}
//                         onFocus={() => setShowSuggestions(true)}
//                     />
//                 </Form>
//             <div id='searchresults'>
//                 {showSuggestions && (
//                     <ul className='suggestions'>
//                         {suggestions.map(suggestion => (
//                             <li onClick={() => handleSuggestionClick(suggestion.recipe_details.name)} 
//                                 key={suggestion.recipe_details.name}>
//                                 {suggestion.recipe_details.name}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>