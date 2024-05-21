export const URL = "https://api.chucknorris.io/jokes";
const FromCatURL = "https://api.chucknorris.io/jokes/random?category=";
const CATEGORIES = `https://api.chucknorris.io/jokes/categories`;

export const service = {
  getJoke: (arg) => fetch(`${URL}/${arg}`).then((data) => data.json()),
  getCategories: () => fetch(CATEGORIES).then((data) => data.json()),
};
