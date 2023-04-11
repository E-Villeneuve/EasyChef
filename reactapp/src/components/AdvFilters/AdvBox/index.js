import Checkbox from "./Checkbox";
import './advbox.css';

function AdvBox (filter_title, filters_box, filters,
                 tags, filter_state, set_filter_state) {

        const addTag = (tag) => set_filter_state([...filter_state, tag]);

        const removeTag = (tag) => {
            set_filter_state(filter_state => {
                return filter_state.filter((value, i) => value !== tag);
            })
        }

    return (
        <div className='adv_filter_col'>
            <h4>{filter_title}</h4>
            <div id={filters_box}>
                {filters.map((filter, index) => (
                    <div>
                        {Checkbox(filter, tags[index], addTag, removeTag)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdvBox;