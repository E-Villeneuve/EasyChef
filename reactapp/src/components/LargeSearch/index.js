import './largesearch.css';
import { useContext } from 'react';
import { SearchContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function LargeSearch() {
    const navigate = useNavigate();
    const { setSearchQ } = useContext(SearchContext);

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            setSearchQ(e.target.value);
            navigate('/search');
        }
    }

    return (
    <div id="largesearch">
        <input 
            type="text" 
            id="largesearch_input" 
            placeholder="Search for recipes..."
            onKeyDown={onEnter}
        />
    </div>

    );
}

export default LargeSearch;