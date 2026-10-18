import { useParams } from 'react-router-dom';
import { RecipeForm } from '../CreateRecipe';

function EditRecipe() {
    const { recipeID } = useParams();
    // key resets the form if you navigate from one recipe's edit page to another's
    return <RecipeForm key={recipeID} recipeId={recipeID} />;
}

export default EditRecipe;
