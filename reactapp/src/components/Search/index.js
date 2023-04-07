import './search.css';
import  '../globals.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useRef } from 'react';

function Search(onChangeFunc, placehold_text, set_id) {

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

    return (
        <div id={set_id}>
            <Form className="d-flex" role="search" id="searchbar">
                <Form.Control
                    type="search"
                    placeholder = {placehold_text}
                    onChange={(e) => onChangeFunc(e, setSuggestions, setShowSuggestions)}
                    onFocus={() => setShowSuggestions(true)}
                />
            </Form>
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
        </div>
    );
  }
  
  export default Search;