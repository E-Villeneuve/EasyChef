import { useState } from "react";
import './checkbox.css';
import { useEffect } from "react";

function Checkbox (filter, tag, addTag, removeTag, filter_state) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (filter_state.indexOf(tag) > -1) setChecked(true);
        else setChecked(false);
    }, [])

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
                defaultChecked={checked}
                checked={checked}
                onClick={() => onToggle()}/>
        <span className='filtertext'>
                {filter}
        </span></label>
    );
}

export default Checkbox;