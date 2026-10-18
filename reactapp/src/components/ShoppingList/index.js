import './shoppinglist.css';
import  '../../components/globals.css';
import ShopListItem from './ShopListItem';
import SearchDropdown from '../Search/SearchDropdown';
import { useState, useRef, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import reactStringReplace from 'react-string-replace';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function ShoppingList() {

    // Some help w/ states and on funcs
    // from https://www.youtube.com/watch?v=EpE6TU58cPw
    const [shopLst, setShopLst] = useState([])
    const [allIngredientLst, setAllIngredientLst] = useState([])
    const { setLoading, setError, setPageLoading } = useContext(UserContext);

    const [isActive, setIsActive] = useState(false) 
    const [popup, setPopup] = useState(false);
    const navigate = useNavigate();

    const buttonNav = (id) => navigate('/viewrecipe/' + id);

    const handleOpen = (index) => {
        setIsActive(index);
        setPopup(true);
    }
    const handleClose = () => setPopup(false);

    if (popup) document.body.classList.add('active_addshopitem_popup');
    else document.body.classList.remove('active_addshopitem_popup');

    const autocompleteRef = useRef();

    useEffect(() => {
        setLoading(true);
        setPageLoading(true);
        AOS.init({ duration: 1000 });
        displayShopLst();
        setPageLoading(false);
        
    }, [])

    const displayShopLst = async () => {
        let request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))}
        }

        const response = await fetch("http://127.0.0.1:8000/recipes/myshoppinglist/", request);
        const json = await response.json().finally(() => setLoading(false));
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
        setLoading(true);
        setshow(false);
        let request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
            body: JSON.stringify({ 'original_recipe': id, 'serving': 1})
        }
        await fetch("http://127.0.0.1:8000/recipes/myshoppinglist/add/", request);
        displayShopLst();
        setLoading(false);
    }

    const onClickDel = async (id) => {
        setLoading(true);
        let request = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
        }
        await fetch("http://127.0.0.1:8000/recipes/myshoppinglist/delete/" + id + '/', request);
        displayShopLst();
    }

    const onChangeServing = async (e, item) => {
        setLoading(true);
        let num;
        if (e.target.value) {
            if (e.target.value < 0) {
                setError('A recipe\'s serving size cannot be negative. Try another serving size!');
                displayShopLst();
                return;
            }
            if (e.target.value > 9999) {
                setError('This recipe\'s serving size is too large. Try another serving size!');
                displayShopLst();
                return;
            }
            num = e.target.value;
        }
        else num = 0;
        let request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + String(localStorage.getItem('access'))},
            body: JSON.stringify({ 'serving': num})
        }

        await fetch('http://127.0.0.1:8000/recipes/myshoppinglist/edit/' + item.shoplstrecipe_id + '/', request)
        .then(res => { // handling via https://stackoverflow.com/questions/54163952/async-await-in-fetch-how-to-handle-errors
            if (res.status >= 400 && res.status < 600) setError('This is an invalid serving size. Try something else!');
        })
        displayShopLst();
    }

    // Downloads the combined ingredient totals as shopping_list.csv
    const exportCsv = () => {
        const escapeCsv = (value) => {
            const text = String(value ?? '');
            return /[",\r\n]/.test(text) ? '"' + text.replace(/"/g, '""') + '"' : text;
        }
        const rows = [['Ingredient', 'Amount'],
                      ...Object.keys(allIngredientLst).map(key => [key, allIngredientLst[key]])];
        const csv = rows.map(row => row.map(escapeCsv).join(',')).join('\r\n');

        // The BOM lets Excel read the file as UTF-8
        const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'shopping_list.csv';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    const showSuggestion = (suggestion, setShowSuggestions, value) => {
        return (<li onClick={() => onClick(suggestion.recipe_details.id,
                                        setShowSuggestions)} 
            key={suggestion.recipe_details.name}>
            {reactStringReplace(suggestion.recipe_details.name, value, (match, i) =>
            <b>{match}</b>)}
        </li>)
    }

    return (<>
            <div className="container" id="shop-page" ref={autocompleteRef}>
                <header className="sl-header">
                    <h1 className="sl-title">My Shopping List</h1>
                    <p className="sl-subtitle">
                        Add recipes, set how many servings you need, and we'll total up the ingredients.
                    </p>
                </header>

                <section className="sl-card sl-search-card">
                    <h2 className="sl-card-title">Add a recipe</h2>
                    {SearchDropdown(onChange, 'Search for a recipe to add…', 'shop_search',
                                    showSuggestion)}
                </section>

                <div className="sl-layout">
                    <section className="sl-main" aria-label="Recipes on your list">
                        {shopLst && shopLst.length > 0 ? shopLst.map((shopItem, index) =>
                            ShopListItem(shopItem, onClickDel, onChangeServing,
                                         popup, handleOpen, handleClose, isActive,
                                         index, buttonNav)) : (
                            <div className="sl-card">
                                <p className="sl-empty">
                                    Your list is empty. Search for a recipe above to add it.
                                </p>
                            </div>
                        )}
                    </section>

                    <aside className="sl-side">
                        <section className="sl-card">
                            <h2 className="sl-card-title">All Ingredients</h2>
                            {allIngredientLst && Object.keys(allIngredientLst).length > 0 ? (
                                <ul className="sl-ingredients">
                                    {Object.keys(allIngredientLst).map(key =>
                                        <li data-aos-offset='0px' data-aos="fade-left" key={key}>
                                            <span className="sl-ingredient-name">{key}</span>
                                            <span className="sl-ingredient-qty">{allIngredientLst[key]}</span>
                                        </li>)}
                                </ul>
                            ) : <p className="sl-empty">Ingredients from your recipes will appear here.</p>}
                            <button type="button" className="sl-btn sl-btn-primary sl-export"
                                    onClick={exportCsv}
                                    disabled={!allIngredientLst || Object.keys(allIngredientLst).length === 0}>
                                Export
                            </button>
                        </section>
                    </aside>
                </div>
            </div>
        </>);
  }
  
  export default ShoppingList;
