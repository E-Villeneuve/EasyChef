import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './carousel.css';
import Card from './Card';
import { dataDigitalBestSeller } from './data';

// Most carousel code from: https://www.youtube.com/watch?v=FLt2TveqHQM
// and https://react-slick.neostack.com/docs/example/custom-arrows

function HomeCarousel() {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style,
                    display: "block",
                    background: "#2dadd2", }}
            onClick={onClick}
          />
        );
      }

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "5px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>
  };

  return (
    <div className="homecarousel">
      <Slider {...settings}>
        {dataDigitalBestSeller.map((item) => (
            Card(item)
        ))}
      </Slider>
    </div>
  );
}

export default HomeCarousel;