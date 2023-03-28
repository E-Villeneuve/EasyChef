// import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';

import './shopitem.css';
import  '../../components/globals.css';

function ShopListItem(item) {
    // const [defaultImage] = useState({});
    return (
        <Container className="container-lg">
            <div class="card shoplistcard shop_item recipe" id="fst_item">
                <div class="shop_recipe_item">
                    <div class="shop_item_pic_area"> 
                    {/* <!-- Egg sandwich information from https://www.foodnetwork.com/recipes/fried-egg-sandwich-3529179 --> */}
                        <img 
                            src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/11/3/2/NLV-Crave-Worthy_breakfast-sandwich_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1478289713133.jpeg"
                            alt="egg sandwich" 
                            className="shop_item_pic"
                        />
                    </div>
                    <p class="recipe_name">Egg sandwich</p>
                    <div class="shop_item_details">
                        <ul id="brief_info">
                            <li>
                                <div class="servings">
                                    <div class="col-auto">
                                    <label for="inputserving" class="col-form-label">Servings:</label>
                                    </div>
                                    <div class="col-auto">
                                    <input type="text" id="inputserving" value="1" class="form-control inputserving" aria-describedby="passwordHelpInline"/>
                                    </div>
                                </div>
                            </li>
                            <li>Cooking time: 20 mins</li>
                        </ul>
                        <a class="btn btn-secondary shop_item_button" type="button" aria-expanded="false" href="recipe.html">
                            Details
                        </a>
                        <div class="dropdown-center">
                            <button class="btn btn-secondary dropdown-toggle shop_item_button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Ingredients
                            </button>
                            <ul class="dropdown-menu">
                                <li><p class="dropdown-item">1 tablespoon of ketchup</p></li>
                                <li><p class="dropdown-item">1/2 teaspoons of chipotle</p></li>
                                <li><p class="dropdown-item">2 slices of sourdough bread</p></li>
                                <li><p class="dropdown-item">2 slices of cheddar</p></li>
                                <li><p class="dropdown-item">2 tablespoons of unsalted butter</p></li>
                                <li><p class="dropdown-item">1 slice of bacon</p></li>
                                <li><p class="dropdown-item">1 egg</p></li>
                            </ul>
                        </div>
                    </div>
                    <button class="btn btn-secondary plus" type="button" id="close_item" aria-expanded="false"></button>
                </div>
            </div>
        </Container>

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