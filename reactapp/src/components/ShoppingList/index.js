import './shop_lst.css';
import  '../../components/globals.css';
import ShopListItem from './ShopListItem';
import SearchDropdown from '../Search/SearchDropdown';
import Button from 'react-bootstrap/Button';
import { useState, useRef, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import reactStringReplace from 'react-string-replace';

function ShoppingList() {

    // TODO: Add loading components to btns

    // Some help w/ states and on funcs
    // from https://www.youtube.com/watch?v=EpE6TU58cPw
    const [shopLst, setShopLst] = useState([])
    const [allIngredientLst, setAllIngredientLst] = useState([])

    const autocompleteRef = useRef();

    useEffect(() => {
        AOS.init({ duration: 1000 });
        displayShopLst();
    }, [])

    const displayShopLst = async () => {
        let request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))}
        }

        const response = await fetch("http://127.0.0.1:8000/recipes/myshoppinglist/", request);
        const json = await response.json();
        setShopLst(json.recipes_details);
        setAllIngredientLst(json.total_ingredients);
    }

    const onChange = (e, setsuggests, setshow) => {
        let request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        }
        fetch("http://127.0.0.1:8000/search/?search=" + e.target.value, request)
        .then(response => response.json()
        ).then(data => {
            setsuggests(data.results);});
            setshow(true);
    }

    const onClick = async (id, setshow) => {
        setshow(false);
        let request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
            body: JSON.stringify({ 'original_recipe': id, 'serving': 1})
        }
        await fetch("http://127.0.0.1:8000/recipes/myshoppinglist/add/", request);
        displayShopLst();
    }

    const onClickDel = async (id) => {
        let request = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
        }
        await fetch("http://127.0.0.1:8000/recipes/myshoppinglist/delete/" + id + '/', request);
        displayShopLst();
    }

    const onChangeServing = async (e, item) => {
        let num;
        if (e.target.value) {
            num = e.target.value;
        }
        else num = 0;
        let request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
            body: JSON.stringify({ 'serving': num})
        }

        await fetch('http://127.0.0.1:8000/recipes/myshoppinglist/edit/' + item.shoplstrecipe_id + '/', request)
        displayShopLst();
    }

    const showSuggestion = (suggestion, setShowSuggestions, value, onClickFunc) => {
        return (<li onClick={() => onClick(suggestion.recipe_details.id,
                                        setShowSuggestions)} 
            key={suggestion.recipe_details.name}>
            {reactStringReplace(suggestion.recipe_details.name, value, (match, i) =>
            <b>{match}</b>)}
        </li>)
    }

    return (shopLst && (
        <div className="shop_wrap" ref={autocompleteRef}>
            <div id='searchsec'>
                <h2 id="shop_title"><b>My Shopping List</b></h2>
                {SearchDropdown(onChange, 'What would you like to add?', 'shop_search', showSuggestion)}
            </div>
                <div id="shop_items">
                {shopLst.map((shopItem) => ShopListItem(shopItem, onClickDel, onChangeServing))}
                    <div id="allingredientslst">
                        <h4 id="allingredientstitle">All Ingredients</h4>
                        {Object.keys(allIngredientLst).map((key, index) =>
                        <li data-aos-offset='0px' data-aos="fade-left" key={key}>{allIngredientLst[key]} {key}</li>)}
                    </div>
                <Button id="export_btn" onClick={() => window.print()}>
                    Export
                </Button>
            </div>
        </div>));
  }
  
  export default ShoppingList;
