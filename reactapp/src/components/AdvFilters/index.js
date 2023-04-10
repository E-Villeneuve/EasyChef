import './advfilters.css'
import AdvBox from './AdvBox';

function AdvFilters() {
    return (
        <div id='adv_filters'>
            <h3><b>Advanced Search</b></h3>
            {AdvBox('Diets', 'search_for_diets', ['Halal', 'Vegan'])}
            {AdvBox('Cuisines', 'search_for_cuisines', ['< 1 hr', 'Welsh', 'Arabic', 'Test'])}
            {AdvBox('Cooking Time', 'search_for_time', ['< 1 hr', '1~2 hrs', '2~3 hrs', '3+ hrs'])}
            {AdvBox('Search by', 'search_for_boxes', ['Recipes', 'Users', 'Ingredients'])}
        </div>

    );
}

export default AdvFilters;