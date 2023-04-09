import './AdvancedSearch.css';
import './checkmarks.css';
import '../../components/globals.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, setState } from 'react';
import RecipeCard from '../../components/RecipeCard';
import noimage from '../../images/noimageavailable.png'

function AdvancedSearch () {
    return (
        <div className="search_wrap">
            <div id='main_search'>
                <h2 id="shop_title"><b>Search</b></h2>
                
                    <input type='text' id="page_search_bar" placeholder='Search...'></input>
                    <div className="card advanced_card shop_item recipe">
                        <h3><b>Advanced Search</b></h3>
                    <div className='specs_row'>
                        <div className='specs_column'>
                            <h4>Diets</h4>
                            <div className='search-for-diet'>
                                <div>
                                <label><input type='checkbox' className='searchcheck'></input><span>Halal</span></label>
                                </div>
                                <div>
                                <label><input type='checkbox' className='searchcheck'></input><span>Vegan</span></label>
                                </div>
                                
                            </div>
                        </div>

                        <div className='specs_column'>
                            <h4>Cuisines</h4>
                            <div className='search-for-cuisine'>
                                <div>
                                <label><input type='checkbox' className='searchcheck cuisine'></input><span>Test</span></label>
                                </div>
                                <div>
                                <label><input type='checkbox' className='searchcheck cuisine'></input><span>Test</span></label>
                                </div>
                                <div>
                                <label><input type='checkbox' className='searchcheck cuisine'></input><span>Test</span></label>
                                </div>
                                <div>
                                <label><input type='checkbox' className='searchcheck cuisine'></input><span>Test</span></label>
                                </div>
                                
                            </div>
                        </div>

                        <div className='specs_column'>
                        <h4>Cooking Time</h4>
                        <div className='search-for-time'>
                                <div>
                                <label><input type='checkbox' className='searchcheck'></input><span> &lt; 1 hr </span></label>
                                </div>
                                <div>
                                <label><input type='checkbox' className='searchcheck'></input><span>1~2 hrs</span></label>
                                </div>
                                <div>
                                <label><input type='checkbox' className='searchcheck'></input><span>2~3 hrs</span></label>
                                </div>
                                <div>
                                <label><input type='checkbox' className='searchcheck'></input><span>3+ hrs</span></label>
                                </div>
                        </div>
                        </div>
                            
                        
                        <div className='specs_column'>
                            <h4>Specify Search</h4>
                        <div className='search-for-boxes'>
                                <div>
                                <label><input type='checkbox' className='searchcheck'></input><span>Recipes</span></label>
                                </div>
                                <div>
                                <label><input type='checkbox' className='searchcheck'></input><span>Users</span></label>
                                </div>
                                <div>
                                <label><input type='checkbox' className='searchcheck'></input><span>Ingredients</span></label>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    </div>
                    
                
                
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

export default AdvancedSearch;
