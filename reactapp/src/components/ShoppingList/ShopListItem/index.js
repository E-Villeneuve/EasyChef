import '../shoppinglist.css';
import  '../../globals.css';
import { Modal } from 'react-bootstrap';
import noimage from '../../../images/noimageavailable.png'

function ShopListItem(item, delFunc, changeServing, popup,
                      handleOpen, handleClose, isActive, index,
                      buttonNav) {

    const shopitemid = item.shoplstrecipe_id;
    const servingsId = 'inputserving-' + shopitemid;

    return (
        <article className="sl-card sl-item" key={shopitemid} data-aos="flip-left" data-aos-offset='0px'>
            <img
                src={item.pic_rep ? item.pic_rep : noimage}
                alt={item.recipe_name}
                className="sl-item-img"
            />
            <div className="sl-item-body">
                <div className="sl-item-head">
                    <h3 className="sl-item-name">{item.recipe_name}</h3>
                    <button
                        type="button"
                        className="sl-remove"
                        aria-label={'Remove ' + item.recipe_name + ' from your list'}
                        onClick={() => delFunc(shopitemid)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <p className="sl-item-meta">Cooking time: {'' + item.cook_time} mins</p>
                <div className="sl-item-controls">
                    <div className="sl-servings">
                        <label htmlFor={servingsId} className="sl-field-label">Servings</label>
                        <input type="number"
                                id={servingsId}
                                defaultValue={item.servings ? item.servings : ''}
                                className="sl-input"
                                min="0"
                                step="1"
                                maxLength="3"
                                onBlur={(e) => changeServing(e, item)}
                                pattern="/d+"/>
                    </div>
                    <div className="sl-item-actions">
                        <button type="button" className="sl-btn sl-btn-outline" onClick={() => buttonNav(item.orig_id)}>
                            Details
                        </button>
                        <button type="button" className="sl-btn sl-btn-outline" onClick={() => handleOpen(index)}>
                            Ingredients
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                show={isActive === index && popup}
                onHide={handleClose}
                className='sl-dialog'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ingredients for {item.recipe_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className='sl-ingredients'>
                    {Object.keys(item.ingredients).map(key =>
                        <li key={key}>
                            <span className="sl-ingredient-name">{key}</span>
                            <span className="sl-ingredient-qty">{item.ingredients[key]}</span>
                        </li>)}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" onClick={handleClose} className='sl-btn sl-btn-primary'>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </article>
    );
}

export default ShopListItem;
