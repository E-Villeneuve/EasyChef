import './MyRecipes.css';
import '../../components/globals.css';
import { useEffect, useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import RecipeCarousel from '../../components/RecipeCarousel';
import { UserContext } from '../../App';
import { API } from '../../recipeOptions';

function UserMyRecipes() {
    const navigate = useNavigate();
    const { setError, setSuccess } = useContext(UserContext);

    let [created, setCreated] = useState(null);
    let [favourited, setFavourited] = useState(null);
    let [interacted, setInteracted] = useState(null);
    const [toDelete, setToDelete] = useState(null); // recipe_details awaiting confirmation
    const [deleting, setDeleting] = useState(false);

    const loadRecipes = useCallback(() => {
        let request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('access')},
        }
        fetch(API + "/accounts/myrecipes/", request)
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

    useEffect(() => {
        loadRecipes();
    }, [loadRecipes]);

    const confirmDelete = () => {
        setDeleting(true);
        fetch(API + "/recipes/" + toDelete.id + "/edit/", {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access') },
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                setSuccess('"' + toDelete.name + '" was deleted.');
                setToDelete(null);
                loadRecipes();
            })
            .catch(() => setError('"' + toDelete.name + '" could not be deleted. Please try again.'))
            .finally(() => setDeleting(false));
    };

    const myRecipeActions = {
        onEdit: (recipe) => navigate('/editrecipe/' + recipe.id),
        onDelete: (recipe) => setToDelete(recipe),
    };

    return (
        <>
        <div className='myrecipes-page'>

        <div className='myrecipes-body'>


        <h1 className='myrecipes-header'>My Recipes</h1>
        <div className='myrecipes-carousel'>
        {RecipeCarousel(created, myRecipeActions)}
        </div>

        <h1 className='myrecipes-header'>Favourited Recipes</h1>
        <div className='myrecipes-carousel'>
        {RecipeCarousel(favourited)}
        </div>
        <h1 className='myrecipes-header'>Recipes you've recently interacted with</h1>
        <div className='myrecipes-carousel'>
        {RecipeCarousel(interacted)}
        </div>
        </div>
        </div>

        <Modal show={toDelete !== null} onHide={() => !deleting && setToDelete(null)} centered
            dialogClassName="myrecipes-delete-dialog" aria-labelledby="delete-recipe-title">
            <Modal.Header closeButton={!deleting}>
                <Modal.Title id="delete-recipe-title">Delete this recipe?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <strong>{toDelete && toDelete.name}</strong> will be permanently deleted, along with its
                    photos, ingredients, steps and comments. This can't be undone.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="myrecipes-btn" onClick={() => setToDelete(null)} disabled={deleting}>
                    Keep recipe
                </button>
                <button type="button" className="myrecipes-btn myrecipes-btn-danger" onClick={confirmDelete} disabled={deleting}>
                    {deleting ? 'Deleting…' : 'Delete recipe'}
                </button>
            </Modal.Footer>
        </Modal>
        </>

    );
}

export default UserMyRecipes;
