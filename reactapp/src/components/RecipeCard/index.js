import React from 'react';
import noimage from '../../images/noimageavailable.png'
import './recipecard.css'
import { useState, setState } from 'react';

/* Most Card CSS from: https://www.youtube.com/watch?v=FLt2TveqHQM */

function RecipeCard(item) {
    // {/* Card template from https://getbootstrap.com/docs/5.3/components/card/ */}
    // <div className="card-body">
    // <h4 className="card-title">Chocolate Spaghetti</h4>
    // <h6>Cook Time: 1hr 15min</h6>
    // <p className="card-text">
    //     Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    // </p>
    // <a href="recipe.html" className="btn btn-primary">
    //     View
    // </a>
    // </div>
    return (
    <div className="recipecard" key={item.id}>
        <div className="recipecard-top img_wrap">
            <img
                src={
                    item.linkImg ? item.linkImg : noimage
                }
                alt={item.name}
                id='recipecard_img'
            />
        <h1>{item.name}</h1>
        </div>
        <div className="recipecard-bottom">
              <h3>{item.rating}</h3>
              <span className="recipecat">{item.category}</span>
        </div>
    </div>
    );
}

export default RecipeCard;