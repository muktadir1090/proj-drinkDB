document.getElementById('getRecipeBtn').addEventListener('click', function() {
        const drinkName = document.getElementById('drinkInput').value;
        const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const recipeDiv = document.getElementById('recipeDisplay');
                recipeDiv.innerHTML = ''; // Clear previous content
    
                if (data.drinks) {
                    const drink = data.drinks[0];
                    recipeDiv.innerHTML = `
              h2>${drink.strDrink}</h2>
                        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <h3>Ingredients:</h3>
                        <ul>
                            ${Object.keys(drink)
                                .filter(key => key.startsWith('strIngredient') && drink[key])
                                .map(key => `<li>${drink[key]} - ${drink[`strMeasure${key.match(/\d+/)[0]}`] || ''}</li>`)
                                .join('')}
                        </ul>
                        <h3>Instructions:</h3>
                        <p>${drink.strInstructions}</p>
                    `;
                } else {
                    recipeDiv.innerHTML = '<p>No recipe found. Please try another drink.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('recipeDisplay').innerHTML = '<p>Error fetching recipe. Please try again later.</p>';
            });
    });