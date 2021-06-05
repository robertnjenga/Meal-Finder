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
          mealsEl.innerHTML = data.meals.map(meal => `
           
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

// Event Listeners
submit.addEventListener('submit', searchMeal);
