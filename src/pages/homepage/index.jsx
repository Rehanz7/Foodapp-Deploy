import { useEffect, useState } from "react";
import Search from "../../components/search";
import "./styles.css";
import RecipeItem from "../../components/recipe-item";
import FavoritesItem from "../../components/favorites-item";

const Homepage = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

  const getDataFromSearchComponent = (getData) => {
    console.log(getData);
    setLoadingState(true);

    async function getReceipes() {
      const apiResponse =
        await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=8267c0f19d8f429584c10d0bfbc232f2&query=${getData}
`);
      const result = await apiResponse.json();
      console.log(result);
      const { results } = result;

      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
        setApiCalledSuccess(true);
      }
    }

    getReceipes();
  };

  const addToFavorites = (getCurrentRecipeItem) => {
    let cpyFavorites = [...favorites];

    const index = cpyFavorites.findIndex(
      (item) => item.id === getCurrentRecipeItem.id
    );
    if (index === -1) {
      cpyFavorites.push(getCurrentRecipeItem);
      setFavorites(cpyFavorites);
      localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
    } else {
      alert("Item is already present");
    }
    console.log(index);
  };

  const removeFromFavorites = (getCurrentId) => {
    let cpyFavorites = [...favorites];
    cpyFavorites = cpyFavorites.filter((item) => item.id !== getCurrentId);
    setFavorites(cpyFavorites);
    localStorage.setItem("favorites", JSON.stringify(cpyFavorites));
  };
  useEffect(() => {
    const extractFavoritesFromLocalStorageOnLoad = JSON.parse(
      localStorage.getItem(`favorites`)
    );
    setFavorites(extractFavoritesFromLocalStorageOnLoad || []);
  }, []);

  return (
    <div className="homepage">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        apiCalledSuccess={apiCalledSuccess}
        setApiCalledSuccess={setApiCalledSuccess}
      />
      <div className="favorites-wrappper">
        <h1 className="favorites-title">Favorites</h1>
        <div className="favorites">
          {favorites && favorites.length > 0
            ? favorites.map((item) => (
                <FavoritesItem
                  removeFromFavorites={() => removeFromFavorites(item.id)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : null}
        </div>
      </div>

      {loadingState && (
        <div className="loading"> Please Wait! List is loading... </div>
      )}

      <div className="items">
        {recipes && recipes.length > 0
          ? recipes.map((item) => (
              <RecipeItem
                addToFavorites={() => addToFavorites(item)}
                id={item.id}
                image={item.image}
                title={item.title}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Homepage;
