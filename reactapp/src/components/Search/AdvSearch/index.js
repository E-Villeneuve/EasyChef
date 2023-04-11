import '../search.css'; // use same styling for consistency
import  '../../globals.css';
import Form from 'react-bootstrap/Form';
import { useEffect, useContext } from 'react';
import { SearchContext } from '../../../App';

function AdvSearch(onChangeFunc, placehold_text, set_id, 
                searchResults) {

    // Some help w/ states and on funcs
    // from https://www.youtube.com/watch?v=EpE6TU58cPw


    const { searchQ, setSearchQ, // searchQ is for when user redirects to advSearch
            diets, setDiets, 
            cuisines, setCuisines,
            timeTags, setTimeTags,
            searchCats, setSearchCats, // keep sets, as will need for redirects
            ordering, setOrdering,
            suggestions, setSuggestions} = useContext(SearchContext);

    // will just need suggestions in searchResults, as we're not replacing strings nor
    // conditionally showing suggestion
    useEffect(() => {

    }, [diets, cuisines, timeTags, searchCats, ordering, searchQ])

    return (
        <div id={set_id}>
            <Form className="d-flex" role="search" id="searchbar">
                <Form.Control
                    type="search"
                    placeholder = {placehold_text}
                    onChange={(e) => setSearchQ(e.target.value)}
                />
            </Form>
            {searchResults(suggestions)}
        </div>
    );
  }
  
  export default AdvSearch;