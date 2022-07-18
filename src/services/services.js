async function fetchRecipes(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error.message));
}

export default fetchRecipes;
