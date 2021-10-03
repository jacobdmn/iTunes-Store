import React, { useContext } from "react";
import { UserContext } from "../data";
import Results from "./results";

const Favorite = () => {
  const { favoriteList, setFavoriteList } = useContext(UserContext);

  return (
    <div className='container'>
      <div className='results'>
        {favoriteList.length > 0 && (
          <Results
            key={new Date().getTime()}
            results={{}} /// MY RESULTS: FAVORITE ONES
            favorite={favoriteList}
            setFavorite={setFavoriteList}
          />
        )}
      </div>
    </div>
  );
};

export default Favorite;
