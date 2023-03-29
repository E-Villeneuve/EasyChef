import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './recipecarousel.css';
import RecipeCard from '../RecipeCard';
import { dataDigitalBestSeller } from './data';

// Most carousel code from: https://www.youtube.com/watch?v=FLt2TveqHQM
// and https://react-slick.neostack.com/docs/example/custom-arrows

function RecipeCarousel() {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "5px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="recipecarousel">
      <Slider {...settings}>
        {dataDigitalBestSeller.map((item) => (
            RecipeCard(item)
        ))}
      </Slider>
    </div>
  );
}

export default RecipeCarousel;