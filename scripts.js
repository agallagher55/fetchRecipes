// Example http://www.recipepuppy.com/api/?i=onions,garlic
const proxy = 'https://cors-anywhere.herokuapp.com'

const mealsBtn = document.querySelector('button[name="getMeals"]');
const mealsInput = document.querySelector('input[name="meal"]');

const ingredientsBtn = document.querySelector('button[name="getIngredients"]');
const ingredientsInput = document.querySelector('input[name="ingredients"]');

const recipesEl = document.querySelector('.recipes');
recipesEl.textContent = "Loading...";

async function getRecipes(dish, ingredients = []) {
    recipesEl.textContent = "Loading...";

    const endpoint = 'http://www.recipepuppy.com/api';
    let response = ''

    // Split functino for ingredients or meal
    if (ingredients.length > 0) {
        ingredients = ingredients.split(' ')
        console.log(ingredients)

        recipesEl.textContent = `Loading ${ingredients} recipes...`;
        response = await fetch(`${proxy}/${endpoint}/?i=${ingredients.join(',')}`)
    }
    else {
        recipesEl.textContent = `Loading ${dish} recipes...`;
        response = await fetch(`${proxy}/${endpoint}/?q=${dish}`)

    }

    const data = await response.json();
    console.log(data)
    const recipes = data.results.map(x => `<a href="${x.href}">${x.title}</a>`);

    const recipesUl = document.createElement('ul');

    const recipeListHtml = recipes.map(function (x) {
        return `<li>${x}</li>`
    }).join('');

    recipesEl.textContent = '';
    recipesUl.innerHTML = recipeListHtml;
    recipesEl.insertAdjacentElement("beforeEnd", recipesUl)

    ingredientsInput.value = '';
    mealsInput.value = '';
};


function handleMealInput(e) {
    if (e.type == 'click') {
        const meal = mealsInput.value;
        meal.length > 0 ? getRecipes(meal) : recipesEl.textContent = 'Choose a meal';
    }
};

function handleIngredientsInput(e) {
    const ingredients = ingredientsInput.value;
    console.log(ingredients)
    getRecipes('', ingredients)
}

// Get meal input
mealsBtn.addEventListener('click', handleMealInput);

// Get ingredients input
ingredientsBtn.addEventListener('click', handleIngredientsInput)

getRecipes('pizza');