document.addEventListener('DOMContentLoaded', function() {
    const apiURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

    fetch(apiURL)
        .then(response => response.json())
        .then(data => displayRecipe(data))
        .catch(error => console.error('Error fetching data:', error));
});

function displayRecipe(data) {
    const recipeResult = document.getElementById('recipe-result');
    recipeResult.innerHTML = '';

    if (data.drinks) {
        const drink = data.drinks[0];
        const recipeHTML = `
            <p class="title is-4">${drink.strDrink}</p>
            <p><strong>Category:</strong> ${drink.strCategory}</p>
            <p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>
            <p><strong>Glass:</strong> ${drink.strGlass}</p>
            <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
                ${getIngredientsList(drink)}
            </ul>
            <figure class="image is-4by3">
                <img src="${drink.strDrinkThumb}" alt="Drink Image">
            </figure>
        `;
        recipeResult.innerHTML = recipeHTML;
    } else {
        recipeResult.innerHTML = '<p>No recipe found for this drink.</p>';
    }
}

function getIngredientsList(drink) {
    let ingredients = '';
    for (let i = 1; i <= 15; i++) {
        if (drink[`strIngredient${i}`]) {
            ingredients += `<li>${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`] || ''}</li>`;
        } else {
            break;
        }
    }
    return ingredients;
}