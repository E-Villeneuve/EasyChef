import './home.css';
import '../../components/globals.css';
import AboutUs from '../../components/AboutUs';
import RecipeCarousel from '../../components/RecipeCarousel';
import Button from 'react-bootstrap/Button';

import homepic from '../../images/homeimage.jpg';

import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const aboutref = useRef(null);
    const handleClick = () => {
        aboutref.current?.scrollIntoView({behavior : 'smooth'});
    };

  return (
    <>
  <title>Home Page</title>
  <div id='home_pic_sec'>
    <div id='homepic_container'>
        <div id='homepic_overlay'>
            <img id='homepic'
                src={homepic}
                alt={"homepic"}
            ></img>
            <span data-aos="fade-down" id='text_home_overlay'>
                <p>
                easy chef<br />
                <h3 id='text_home_subtitle'>
                    the ultimate destination for foodies, chefs,<br />
                    and good food
                </h3>
                </p>
                <Button className='trans_back' id='aboutbtn' onClick={handleClick}>More about us</Button>
            </span>
            </div>
        </div>
  </div>
  <div className='fade_in'>
  <div data-aos="fade-up" className="trans_back" id='featuredbar'>
      <div className="navbar-collapse" id="featuredtitle">
        <h1>Featured</h1>
        <h5 id="featuredsubtitle">Some of our favourites</h5>
      </div>
  <RecipeCarousel />
  </div>
  </div>
  <div data-aos="fade-right" id='home_anecdote'>
    <p>
    <h1>"I have traveled the world, tasted the finest cuisines, 
    and yet I have never encountered such a remarkable collection of culinary ingenuity
    as I have found on easy chef."</h1><br />
    <h5>- Renowned Chef and Restaurateur, Pierre Gagnaire</h5>
    </p>
  </div>
  <div data-aos="fade-up" id='about_us_sec'>
  <AboutUs ref={aboutref}/>
  </div>
</>
  );
}

export default Home;
