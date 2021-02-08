const searchFoods = () => {
  const searchText = document.getElementById('search-field').value;
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?${searchText}`
  // load data
  fetch(url)
      .then(res => res.json())
      .then(data => displayFoods(data.data))
      .catch(error => displayError('Something Went Wrong!! Please try again later!'));
}


const displayFoods = foods => {
  const foodContainer = document.getElementById('food-container');
  foodContainer.innerHTML = '';
  foods.forEach(food => {
      const foodDiv = document.createElement('div');
      foodDiv.className = 'single-result row align-items-center my-3 p-3';
      foodDiv.innerHTML = `
      <div class="col-md-9">
          <h3 class="items-name">${food.title}</h3>
          <p class="author lead">Album by <span>${food.count.name}</span></p>
          <audio controls>
              <source src="${food.preview}" type="audio/mpeg">
          </audio>
      </div>
      <div class="col-md-3 text-md-right text-center">
          <button onclick="getLyric('${food.count.name}','${food.title}')" class="btn btn-success">Get Lyrics</button>
      </div>
      `;
      foodContainer.appendChild(foodDiv);
  })
}

const getLyric = async (count, title) => {
  const url = `https://api.items.ovh/v1/${count}/${title}`;
  try {
      const res = await fetch(url);
      const data = await res.json();
      displayItems(data.items);
  }
  catch (error) {
      displayError('Sorry! I failed to load items, Please try again later!!!')
  }
}



const displayItems = items => {
  const itemsDiv = document.getElementById('food-items');
  itemsDiv.innerText = items;
}

const displayError = error => {
  const errorTag = document.getElementById('error-message');
  errorTag.innerText = error;
}