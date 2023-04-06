import './shopitem.css';
import  '../../globals.css';
import ShopIngredientsList from './ShopIngredientsList';

function ShopListItem(item) {
    // const [defaultImage] = useState({});
    return (
        <div className='shop_item_container'>
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
                    <p className="recipe_name">Egg sandwich</p>
                    <div className="shop_item_details">
                        <ul id="brief_info">
                            <li>
                                <div className="servings">
                                    <div className="col-auto">
                                    <label for="inputserving" className="col-form-label">Servings:</label>
                                    </div>
                                    <div className="col-auto">
                                    <input type="text" id="inputserving" value="1" className="form-control inputserving" aria-describedby="passwordHelpInline"/>
                                    </div>
                                </div>
                            </li>
                            <li>Cooking time: 20 mins</li>
                        </ul>
                        <a className="btn btn-secondary shop_item_button" type="button" aria-expanded="false" href="recipe.html">
                            Details
                        </a>
                        <div className="dropdown-center">
                            <button className="btn btn-secondary dropdown-toggle shop_item_button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Ingredients
                            </button>
                            {ShopIngredientsList(item)}
                        </div>
                    </div>
                    <button className="btn btn-secondary plus" type="button" id="close_item" aria-expanded="false"></button>
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