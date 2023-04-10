import {useContext } from 'react';
import RecipeCard from '../../components/RecipeCard';
import './advsearchresults.css';
import Search from '../Search';
import { SearchContext } from '../../App';

function AdvSearchResults () {

    const { searchQ, setSearchQ, // searchQ is for when user redirects to advSearch
            diets, setDiets, 
            cuisines, setCuisines,
            timeTags, setTimeTags,
            searchCats, setSearchCats, // keep sets, as will need for redirects
            ordering } = useContext(SearchContext);


    const addFilter = (delim, filters) => {
        if (filters && filters.length > 0) return delim + filters.join(delim);
        return '';
    } 

    // What happens as user types in stuff
    const onChange = (e, setsuggests, setshow) => { 
        let diet_delim = "&diets=";
        let cuisine_delim = "&cuisine=";
        let time_delim = "&cookingtimetag=";
        let order_delim = "&ordering=";

        setSearchQ(e.target.value);
        var searchReq = "http://127.0.0.1:8000/search/?";

        let request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        }

        searchReq += "search=" + e.target.value
                  + addFilter(diet_delim, diets)
                  + addFilter(cuisine_delim, cuisines)
                  + addFilter(time_delim, timeTags)
                  + addFilter(order_delim, ordering);
        searchCats.forEach(cat => searchReq += ("&" + cat + "="));
        
        fetch(searchReq, request)
        .then(response => response.json())
        .then(data => setsuggests(data.results));

        setshow(true);
    }

    const searchResult = () => { // For a singular result (ie. 1 Card)
        return (RecipeCard('recipe_item lol'));
    }

    // All cards
    const showSearchResults = (showSuggestions, suggestions, 
                               setShowSuggestions, value) => { 
        return (<div id='advsearchresults'>
                {showSuggestions && (
                    <div className='advsearchcard'>
                    {suggestions.map((suggestion) => {
                        return searchResult(suggestion, setShowSuggestions, value)
                               })}
                    </div>
                )}
        </div>)
    }  

    return (
    <div className="search_wrap">
        <div id='main_search' data-aos='fade-down' data-aos-offset='0px'>
            <h2 id="shop_title"><b>Search</b></h2>
            {Search(onChange, 'What are you looking for?', 'adv_search_results',
                    showSearchResults)}
        </div>
    </div>
    );
}

export default AdvSearchResults;