import './ingredientslist.css';
import  '../../../globals.css';

function ShopIngredientsList(item) {
    // const [defaultImage] = useState({});
    return (
        <ul class="dropdown-menu">
            <li><p class="dropdown-item">1 tablespoon of ketchup</p></li>
            <li><p class="dropdown-item">1/2 teaspoons of chipotle</p></li>
            <li><p class="dropdown-item">2 slices of sourdough bread</p></li>
            <li><p class="dropdown-item">2 slices of cheddar</p></li>
            <li><p class="dropdown-item">2 tablespoons of unsalted butter</p></li>
            <li><p class="dropdown-item">1 slice of bacon</p></li>
            <li><p class="dropdown-item">1 egg</p></li>
        </ul>
    );
}

export default ShopIngredientsList;