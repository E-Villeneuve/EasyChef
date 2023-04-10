

function AdvBox (filter_title, filters_box, filters) {
    return (
        <div className='adv_filter_col'>
            <h4>{filter_title}</h4>
            <div id={filters_box}>
                {filters.map(filter => (
                    <div>
                        <label>
                        <input type='checkbox' className='searchcheck' />
                        <span className='filtertext'>{filter}</span></label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdvBox;