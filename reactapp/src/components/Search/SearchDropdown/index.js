import './search.css';
import  '../../globals.css';
import Search from '../';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useRef } from 'react';

function SearchDropdown(onChangeFunc, placehold_text, set_id) {

    // Some help w/ states and on funcs
    // from https://www.youtube.com/watch?v=EpE6TU58cPw
    // TODO: make dropdown disappear when clicking outside (involves useRef)

    const [value, setValue] = useState('');
    const [ suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSuggestionClick = (suggestion) => {
        setValue(suggestion);
        setShowSuggestions(false);
    }

    const handleSuggestions = () => {
        <div id='searchresults'> 
        {showSuggestions && (
            <ul className='searchsuggestions'>
                {suggestions.map(suggestion => (
                    <li onClick={() => handleSuggestionClick(suggestion.recipe_details.name)} 
                        key={suggestion.recipe_details.name}>
                        {suggestion.recipe_details.name}
                    </li>
                ))}
            </ul>
        )}
        </div>
    }

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
            setsuggests(res.data.results);
            suggestions.map((suggestion) => console.log(suggestion.recipe_details.name))}));
            setshow(true);
        // api to fetch search result 
    }

    return (
        <>
            {Search(onChange, placehold_text, 
                    set_id, handleSuggestions)} 
        </>
    );
  }
  
  export default SearchDropdown;