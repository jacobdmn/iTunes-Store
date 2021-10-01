import React, { useContext } from "react";
import { UserContext } from "../data";
import Results from "./results";

const Favorite = () => {
  const { favoriteList, setFavoriteList } = useContext(UserContext);

  return (
    <div className='container'>
      <div className='title'>
        <h2>Songs You loved</h2>
      </div>
      <div className='results'>
        <Results
          results={favoriteList} /// MY RESULTS: FAVORITE ONES
          favorite={favoriteList}
          setFavorite={setFavoriteList}
        />
      </div>
    </div>
  );
};

export default Favorite;
