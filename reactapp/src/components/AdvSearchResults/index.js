import RecipeCard from '../../components/RecipeCard';
import './advsearchresults.css';
import AdvSearch from '../Search/AdvSearch';

function AdvSearchResults () {
    const searchResult = () => { // For a singular result (ie. 1 Card)
    // Singular Card
        return <span data-aos='fade-left' data-aos-offset='0px'>{RecipeCard('recipe_item lol')}</span>;
    }
    
    const showSearchResults = (suggestions) => { 
    // All cards - <suggestions> contain multiple cards that may be paginated
        return (<div id='advresult_cards'>
                <>
                {suggestions.map((suggestion) => {
                    return searchResult(suggestion)})}
                </>
        </div>)
    }  

    return (
    <div className="search_wrap">
        <div id='main_search' data-aos='fade-down' data-aos-offset='0px'>
            <h2 id="advanced_search_title"><b>Search</b></h2>
            {AdvSearch('What are you looking for?', 'adv_search_sec', showSearchResults)}
        </div>
    </div>
    );
}

export default AdvSearchResults;