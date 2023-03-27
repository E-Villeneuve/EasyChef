import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './card.css'

/* Most Card CSS from: https://www.youtube.com/watch?v=FLt2TveqHQM */

function Card(item) {
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
    const [defaultImage] = useState({});
    return (
    <div className="card">
        <div className="card-top img_wrap">
            <img
                src={
                    defaultImage[item.title] === item.title
                    ? defaultImage.linkDefault
                    : item.linkImg
                }
                alt={item.title}
            />
        <h1>{item.title}</h1>
        </div>
        <div className="card-bottom">
              <h3>{item.price}</h3>
              <span className="category">{item.category}</span>
        </div>
    </div>
    );
}

export default Card;