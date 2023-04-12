import Checkbox from "./Checkbox";
import './advbox.css';

function AdvBox (filter_title, filters_box, filters,
                 tags, query_cat) {

    return (
        <div className='adv_filter_col'>
            <h4>{filter_title}</h4>
            <div id={filters_box}>
                {filters.map((filter, index) => (
                    <div key={filter + index}>
                        {Checkbox(filter, tags[index], query_cat)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdvBox;