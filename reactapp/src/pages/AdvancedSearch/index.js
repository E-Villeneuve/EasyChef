import './AdvancedSearch.css';
import './checkmarks.css';
import '../../components/globals.css';
import AdvFilters from '../../components/AdvFilters';
import AdvSearchResults from '../../components/AdvSearchResults';

function AdvancedSearch () {
    return (
        <div id='adv_search_container'>
            <AdvFilters/>
            <AdvSearchResults/>
        </div>
    );
}

export default AdvancedSearch;
