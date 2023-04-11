import { useState } from "react";
import './checkbox.css';

function Checkbox (filter, tag, addTag, removeTag) {
    const [checked, setChecked] = useState(false);

    const onToggle = () => {
        setChecked(!checked) // wont update immediately
        if (!checked) addTag(tag); // If checked
        else removeTag(tag); // If unchecked
    }

    return (
        <label>
        <input id={filter + "_" + tag}
                type='checkbox'
                className='searchcheck'
                onClick={() => onToggle()}/>
        <span className='filtertext'>
                {filter}
        </span></label>
    );
}

export default Checkbox;