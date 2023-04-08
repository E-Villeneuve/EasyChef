import './home.css';
import '../../components/globals.css';
import AboutUs from '../../components/AboutUs';
import RecipeCarousel from '../../components/RecipeCarousel';
import Button from 'react-bootstrap/Button';
import homepic from '../../images/homeimage.jpg';
import homesearch from '../../images/homesearch.jpg';
import AnimatePage from '../../components/AnimatePage';
import LargeSearch from '../../components/LargeSearch';

import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    const aboutref = useRef(null);
    const handleClick = () => {
        aboutref.current?.scrollIntoView({behavior : 'smooth'});
    };

  return (
    <AnimatePage>
        <div id='home_page_container'>
            <title>Home Page</title>
            <div id='home_pic_sec'>
                <div id='homepic_container'>
                    <div id='homepic_overlay'>
                        <img id='homepic'
                            src={homepic}
                            alt={"homepic"}
                        ></img>
                        <span data-aos="fade-down" id='text_home_overlay'>
                            <p id='hometextbox'>
                            easy chef<br />
                            <span id='text_home_subtitle'>
                                the ultimate destination for foodies, chefs,<br />
                                and good food
                            </span>
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
                <span id='home_quote_text'>"I have traveled the world, tasted the finest cuisines, 
                and yet I have never encountered such a remarkable collection of culinary ingenuity
                as I have found on easy chef."</span><br />
                <span id='home_quote_person'>- Renowned Chef and Restaurateur, Pierre Gagnaire</span>
                </p>
            </div>
            <div id='about_us_sec' ref={aboutref}>
            <AboutUs/>
            </div>
            <div id='homesearch_sec'>
                <div id='homesearch_overlay'>
                        <img id='homesearch'
                            src={homesearch}
                            alt={"homesearch"}
                        ></img>
                    <div data-aos="fade-up" id='homesearch_box_overlay'>
                        <p id='homesearch_title'>What are <b>you</b> looking for?</p>
                        <LargeSearch/>
                    </div>
                </div>
            </div>
        </div>
    </AnimatePage>
  );
}

export default Home;
