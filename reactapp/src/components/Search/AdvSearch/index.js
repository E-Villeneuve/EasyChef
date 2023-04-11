import '../search.css'; // use same styling for consistency
import  '../../globals.css';
import Form from 'react-bootstrap/Form';
import { useEffect, useContext } from 'react';
import { SearchContext } from '../../../App';

function AdvSearch(placehold_text, set_id, searchResults) {

    // Some help w/ states and on funcs
    // from https://www.youtube.com/watch?v=EpE6TU58cPw

    // Only setter is for searchQ and setSuggestions
    // Checkboxes handle setters for the other (ie. cuisines, diets, etc.)
    // Suggestions = paginated json results from server
    const { searchQ, setSearchQ, // searchQ is for when user redirects to advSearch
            diets, cuisines,
            timeTags, searchCats,
            ordering, 
            suggestions, setSuggestions} = useContext(SearchContext);

    useEffect(() => {
        let diet_delim = "&diets=";
        let cuisine_delim = "&cuisine=";
        let time_delim = "&cookingtimetag=";
        let order_delim = "&ordering=";

        var searchReq = "http://127.0.0.1:8000/search/?";
        console.log(searchQ);

        let request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        }

        const addFilter = (delim, filters) => {
            if (filters && filters.length > 0) return delim + filters.join(delim);
            return '';
        } 

        searchReq += "search=" + searchQ
                  + addFilter(diet_delim, diets)
                  + addFilter(cuisine_delim, cuisines)
                  + addFilter(time_delim, timeTags)
                  + addFilter(order_delim, ordering);
        searchCats.forEach(cat => searchReq += ("&" + cat + "="));
        
        fetch(searchReq, request)
        .then(response => response.json())
        .then(data => setSuggestions(data.results));

    }, [diets, cuisines, timeTags, searchCats, ordering, searchQ, setSuggestions])

    return (
        <div id={set_id}>
            <Form className="d-flex" role="search" id="searchbar">
                <Form.Control
                    type="search"
                    placeholder = {placehold_text}
                    onChange={(e) => setSearchQ(e.target.value)}
                    value={searchQ}
                />
            </Form>
            {searchResults(suggestions)}
        </div>
    );
  }
  
  export default AdvSearch;