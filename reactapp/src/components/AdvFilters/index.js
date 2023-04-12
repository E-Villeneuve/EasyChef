import './advfilters.css'
import AdvBox from './AdvBox';

function AdvFilters() {

    return (
        <div id='adv_filters' data-aos='fade-down' data-aos-offset='0px'>
            <h3><b>Filters</b></h3>
            {AdvBox('Diets', 'search_for,_diets', ['Halal', 'Vegan'], 
                    ['HA', 'VE'], 'diets')}
            {AdvBox('Cuisines', 'search_for_cuisines', ['Dutch', 'Welsh', 'Arabic', 'Thai'],
                    ['DU', 'WE', 'AR', 'TH'], 'cuisines')}
            {AdvBox('Cooking Time', 'search_for_time', ['About one hour or less', 'About two hours or less', 
                    'More than 3 hours'], ['1HR', '2HRS', '3HRS'], 'timeTags')}
            {AdvBox('Search by', 'search_for_boxes', ['Recipes', 'Users', 'Ingredients'],
                    ['recipe', 'user', 'ingredients'], 'searchCats')}
            {AdvBox('Order by', 'search_by_order', ['Star rating (Ascending)', 'Star rating (Descending)', 
                    'Favourites (Ascending)', 'Favourites (Descending)'],
                    ['star_rating', '-star_rating', 'favourited', '-favourited'], 'ordering')}
        </div>

    );
}

export default AdvFilters;