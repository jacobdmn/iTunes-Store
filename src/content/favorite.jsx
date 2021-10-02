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
        {favoriteList.length > 0 ? (
          <Results
            results={favoriteList} /// MY RESULTS: FAVORITE ONES
            favorite={favoriteList}
            setFavorite={setFavoriteList}
          />
        ) : (
          <h4 style={{ padding: "2em" }}>love something then come back ;) </h4>
        )}
      </div>
    </div>
  );
};

export default Favorite;
