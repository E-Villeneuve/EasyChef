import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, setState } from 'react';
import RecipeCard from '../../components/RecipeCard';
import noimage from '../../images/noimageavailable.png';
import './advsearchresults.css';
import Search from '../Search';

function AdvSearchResults () {

    const temp = (e) => {
        console.log('test');
        return e;
    }

    return (
    <div className="search_wrap">
        <div id='main_search'>
            <h2 id="shop_title"><b>Search</b></h2>
            {Search(temp, 'What are you looking for?', 'adv_search_res', temp)}
        </div>
        <div className='search-results'>
        <div className='result-row'>
        <div className='result-col'>
        <div className="recipecard">
        <div className="recipecard-top img_wrap">
            <img
                src={
                    false ? noimage : noimage
                }
                alt="title"
                id='recipecard_img'
            />
        <h1>title</h1>
        </div>
        <div className="recipecard-bottom">
            <h3>price</h3>
            <span className="recipecat">category</span>
        </div>
        </div>
        </div>

        <div className='result-col'>

        
        <div className="recipecard">
        <div className="recipecard-top img_wrap">
            <img
                src={
                    false ? noimage : noimage
                }
                alt="title"
                id='recipecard_img'
            />
        <h1>title</h1>
        </div>
        <div className="recipecard-bottom">
            <h3>price</h3>
            <span className="recipecat">category</span>
        </div>
        </div>
        </div>

        <div className='result-col'>

        
        <div className="recipecard">
        <div className="recipecard-top img_wrap">
            <img
                src={
                    false ? noimage : noimage
                }
                alt="title"
                id='recipecard_img'
            />
        <h1>title</h1>
        </div>
        <div className="recipecard-bottom">
            <h3>price</h3>
            <span className="recipecat">category</span>
        </div>
        </div>
        </div>

        <div className='result-col'>

        
        <div className="recipecard">
        <div className="recipecard-top img_wrap">
            <img
                src={
                    false ? noimage : noimage
                }
                alt="title"
                id='recipecard_img'
            />
        <h1>title</h1>
        </div>
        <div className="recipecard-bottom">
            <h3>price</h3>
            <span className="recipecat">category</span>
        </div>
        </div>
        </div>

        

        </div>

        <div className='result-row'>

        
        <div className='result-col'>

        
        <div className="recipecard">
        <div className="recipecard-top img_wrap">
            <img
                src={
                    false ? noimage : noimage
                }
                alt="title"
                id='recipecard_img'
            />
        <h1>title</h1>
        </div>
        <div className="recipecard-bottom">
            <h3>price</h3>
            <span className="recipecat">category</span>
        </div>
        </div>
        </div>

        <div className='result-col'>

        
        <div className="recipecard">
        <div className="recipecard-top img_wrap">
            <img
                src={
                    false ? noimage : noimage
                }
                alt="title"
                id='recipecard_img'
            />
        <h1>title</h1>
        </div>
        <div className="recipecard-bottom">
            <h3>price</h3>
            <span className="recipecat">category</span>
        </div>
        </div>
        </div>

        <div className='result-col'>

        
        <div className="recipecard">
        <div className="recipecard-top img_wrap">
            <img
                src={
                    false ? noimage : noimage
                }
                alt="title"
                id='recipecard_img'
            />
        <h1>title</h1>
        </div>
        <div className="recipecard-bottom">
            <h3>price</h3>
            <span className="recipecat">category</span>
        </div>
        </div>
        </div>

        
        <div className='result-col'>

        
        
        </div>
        

        </div>
        <h2>End of Results</h2>
        </div>
    </div>
    );
}

export default AdvSearchResults;