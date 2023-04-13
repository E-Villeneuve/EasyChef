import './MyRecipes.css';
import '../../components/globals.css';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import AnimatePage from '../../components/AnimatePage';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import RecipeCarousel from '../../components/RecipeCarousel';
import { SearchContext } from '../../App';



function MyRecipes() {

    const { setSuggestions, setPageNum } = useContext(SearchContext);
    const location = useLocation();

    useEffect(() => {
        setSuggestions([]);
        setPageNum(1);
    }, [setSuggestions, setPageNum]);

    let [created, setCreated] = useState(null);
    let [favourited, setFavourited] = useState(null);
    let [interacted, setInteracted] = useState(null);

    useEffect(() => {
    let request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('access')},
    }
    fetch("http://127.0.0.1:8000/accounts/myrecipes/", request)
    .then(response => response.json()
    .then(data => ({
        data: data,
        response: response

    })
    ).then(res => {
        
        setCreated(res.data.myrecipes);
        setFavourited(res.data.favourites);
        setInteracted(res.data.interacted);
       
    }));
    }, []);
    return ( localStorage.getItem('access') ?
        (<AnimatePage>
        <div className='myrecipes-page'>

            <div className='myrecipes-body'>
                <h1 className='myrecipes-header'>My Recipes</h1>
                {RecipeCarousel(created)}
                <h1 className='myrecipes-header'>Favourited Recipes</h1>
                {RecipeCarousel(favourited)}
                <h1 className='myrecipes-header'>Recipes you've recently interacted with</h1>
                {RecipeCarousel(interacted)}
                </div>
            </div>
        
        </AnimatePage>) : (<Navigate to='/unauthorized' state={{path: location.pathname}} />)
        
    );
}

export default MyRecipes;