import './largesearch.css';
import { useNavigate } from 'react-router-dom';
import { createSearchParams } from 'react-router-dom';
import { SearchContext } from '../../App';
import { useContext } from 'react';

function LargeSearch() {
    const navigate = useNavigate();
    const { setSuggestions } = useContext(SearchContext);

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            setSuggestions([]);
            navigate({
                pathname: '/search',
                search: '?' + createSearchParams({query: e.target.value}),
            });
        }
    }

    return (
    <div id="largesearch">
        <input 
            type="text" 
            id="largesearch_input" 
            placeholder="Search for recipes..."
            onKeyDown={onEnter}
            maxLength={255}
        />
    </div>

    );
}

export default LargeSearch;