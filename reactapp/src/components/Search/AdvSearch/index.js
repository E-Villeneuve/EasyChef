import '../search.css'; // use same styling for consistency
import  '../../globals.css';
import Form from 'react-bootstrap/Form';
import { useEffect, useContext } from 'react';
import { SearchContext } from '../../../App';
import { useState, useRef, useCallback } from 'react';
import RecipeCard from '../../RecipeCard';

function AdvSearch(placehold_text, set_id) {

    // Some help w/ states and on funcs
    // from https://www.youtube.com/watch?v=EpE6TU58cPw

    // Infinite paging help from:
    // https://www.youtube.com/watch?v=NZKUirTtxcg
    const { searchQ, setSearchQ, // searchQ is for when user redirects to advSearch
            diets, cuisines,
            timeTags, searchCats,
            ordering, 
            suggestions, setSuggestions} = useContext(SearchContext);
    const [ moreResults, setMoreResults ] = useState(true);
    const [ pageNum, setPageNum ] = useState(1); // storing current page number

    const observer = useRef();
    const lastelemref = useCallback((node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && moreResults) {
                setPageNum(pageNum => pageNum + 1);
            }
        })
        if (node) observer.current.observe(node);
    }, [moreResults])

    useEffect(() => {
        setSuggestions([]);
    }, [searchQ, setSuggestions])

    useEffect(() => {
        const fetchData = () => {
            const addFilter = (delim, filters) => {
                if (filters && filters.length > 0) return delim + filters.join(delim);
                return '';
            } 
    
            let diet_delim = "&diets=";
            let cuisine_delim = "&cuisine=";
            let time_delim = "&cookingtimetag=";
            let order_delim = "&ordering=";
    
            var searchReq = "http://127.0.0.1:8000/search/?page=" + pageNum + "&";
            console.log(searchQ);
    
            let request = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'},
            }
    
            searchReq += "search=" + searchQ
                      + addFilter(diet_delim, diets)
                      + addFilter(cuisine_delim, cuisines)
                      + addFilter(time_delim, timeTags)
                      + addFilter(order_delim, ordering);
            searchCats.forEach(cat => searchReq += ("&" + cat + "="));
            
            fetch(searchReq, request)
            .then(response => response.json())
            .then(data => {
                setMoreResults(data.results.next !== null);
                setSuggestions([...suggestions, ...data.results]);
            });
        }

        if (moreResults) fetchData();
        else setPageNum(1);

    }, [diets, cuisines, timeTags, searchCats, ordering, searchQ, 
        setSuggestions, moreResults, pageNum, suggestions])

    const searchResult = (suggestion, index) => { // For a singular result (ie. 1 Card)
        // Singular Card - suggestion is a recipe
            if (suggestions.length === index + 1) {
                return <span ref={lastelemref} data-aos='fade-left' data-aos-offset='0px'>{RecipeCard('recipe_item lol')}</span>;
            }
            else return <span data-aos='fade-left' data-aos-offset='0px'>{RecipeCard('recipe_item lol')}</span>;
        }
        
    const searchResults = () => { 
    // All cards - <suggestions> contain multiple cards that may be paginated
        return (<div id={'advresult_cards'}>{suggestions.map((suggestion, index) => {
                    return searchResult(suggestion, index)})}</div>);
    }  

    return (
        <div id={set_id}>
            <Form className="d-flex" role="search" id="searchbar">
                <Form.Control
                    type="search"
                    placeholder = {placehold_text}
                    onChange={(e) => {
                        setSearchQ(e.target.value);
                        setPageNum(1);
                    }}
                    value={searchQ}
                />
            </Form>
                {searchResults()}
        </div>
    );
  }
  
  export default AdvSearch;