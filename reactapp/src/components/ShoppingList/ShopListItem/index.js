import './shopitem.css';
import  '../../globals.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

function ShopListItem(item, delFunc, changeServing) {

    return (
        <div className='shop_item_container' data-aos="flip-left" data-aos-offset='0px'>
            <div className="card shoplistcard shop_item recipe">
                <div className="shop_recipe_item">
                    <div className="shop_item_pic_area"> 
                    {/* <!-- Egg sandwich information from https://www.foodnetwork.com/recipes/fried-egg-sandwich-3529179 --> */}
                        <img 
                            src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/11/3/2/NLV-Crave-Worthy_breakfast-sandwich_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1478289713133.jpeg"
                            alt="egg sandwich" 
                            className="shop_item_pic"
                        />
                    </div>
                    <p className="recipe_name">{item.recipe_name}</p>
                    <div className="shop_item_details">
                        <div id="brief_info">
                            <div className="servings">
                                <div className="col-auto">
                                <label className="col-form-label">Servings:</label>
                                </div>
                                <div className="col-auto">
                                <input type="text" 
                                        id="inputserving" 
                                        defaultValue={item.servings ? item.servings : ''} 
                                        className="form-control inputserving"
                                        onBlur={(e) => changeServing(e, item)}/>
                                </div>
                            </div>

                            Cooking time: {item.cook_time} mins
                        </div>
                        {/* reminder to put in linkcontainer here */}
                        <Button className="shop_item_button" href="recipe.html">
                            Details
                        </Button>
                        <Dropdown>
                            <Dropdown.Toggle className="shop_item_button">
                            Ingredients
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Object.keys(item.ingredients).map((key, index) => 
                                <Dropdown.Item 
                                    as="p" 
                                    className="dropdown-item" 
                                    key={key}>
                                        {item.ingredients[key]} {key}
                                </Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Button 
                        id='close_btn'
                        className='trans_back'
                        onClick={() => delFunc(item.shoplstrecipe_id)}>
                        <span id='close_item' className='plus'></span>
                    </Button>
                </div>
            </div>
        </div>

    // <div className="card" key={item.id}>
    //     <div className="card-top img_wrap">
    //         <img
    //             src={
    //                 defaultImage[item.title] === item.title
    //                 ? defaultImage.linkDefault
    //                 : item.linkImg
    //             }
    //             alt={item.title}
    //         />
    //     <h1>{item.title}</h1>
    //     </div>
    //     <div className="card-bottom">
    //           <h3>{item.price}</h3>
    //           <span className="category">{item.category}</span>
    //     </div>
    // </div>
    );
}

export default ShopListItem;