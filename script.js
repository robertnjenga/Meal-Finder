const search = document.querySelector('#search');
const submit = document.querySelector('#submit');
const random = document.querySelector('#random');
const resultHeading = document.querySelector('#result-heading');
const mealsEl = document.querySelector('#meals');
const single_mealEl = document.querySelector('#single-meal');

// Search Meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search Results For '${term}':</h2>`;
        if (data.meals == null) {
          resultHeading.innerHTML = `<p>There are No Results. Try Again</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
           
          <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
              <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
              </div>
          </div>
          `
            )
            .join('');
        }
      });

    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// Fetch Meal By ID
function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredients${i}`]) {
      ingredients.push(`${meal[`strIgredients${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
      <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class="main">
          <p>${meal.strInstructions}</p>
          <h2>
            <ul>
              ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </h2>
        </div>
      <div/>
  `;
}

// Event Listeners
submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealId = mealInfo.getAttribute('data-mealid');
    getMealById(mealId);
  }
});
