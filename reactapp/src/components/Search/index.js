import './search.css';
import  '../globals.css';
import Form from 'react-bootstrap/Form';
import reactStringReplace from 'react-string-replace';
import { useEffect, useState, useRef } from 'react';

function Search(onChangeFunc, placehold_text, set_id,
                onClickFunc) {

    // Some help w/ states and on funcs
    // from https://www.youtube.com/watch?v=EpE6TU58cPw

    const [value, setValue] = useState('');
    const [ suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const autocompleteRef = useRef();

    useEffect(() => {
        const handleClick = (event) => { // Clicks outside of area disable suggestions from showing
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target))
            setShowSuggestions(false);
        }
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [onChangeFunc, onClickFunc])

    return (
        <div id={set_id} ref={autocompleteRef}>
            <Form className="d-flex" role="search" id="searchbar">
                <Form.Control
                    type="search"
                    placeholder = {placehold_text}
                    onChange={(e) => {
                        onChangeFunc(e, setSuggestions, setShowSuggestions);
                        setValue(e.target.value)}}
                    onFocus={() => setShowSuggestions(true)}
                />
            </Form>
            <div id='searchresults'>
                {showSuggestions && (
                    <ul className='searchsuggestions'>
                        {suggestions.map(suggestion => (
                            <li onClick={() => onClickFunc(suggestion.recipe_details.id,
                                                            setShowSuggestions)} 
                                key={suggestion.recipe_details.name}>
                                {reactStringReplace(suggestion.recipe_details.name, value, (match, i) =>
                                <b>{match}</b>)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
  }
  
  export default Search;