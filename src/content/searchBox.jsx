import React, { useContext } from "react";
import { UserContext } from "../data";
import Results from "./results";

const SearchBox = () => {
  /// CONTEXT API HOOK, DATA SHARABLE
  const {
    data_GLOBAL,
    handleSearch,
    refContainer,
    favoriteList,
    setFavoriteList,
  } = useContext(UserContext);

  return (
    <div className='container'>
      <h2>
        <form onSubmit={(e) => handleSearch(e)}>
          <input
            id='song'
            type='text'
            placeholder='what song? ..'
            autoFocus={true}
            autoComplete='off'
            ref={refContainer}
            onChange={(e) => handleSearch(e)}
          />
        </form>
      </h2>
      <div className='results'>
        <Results
          results={[...new Set(data_GLOBAL)]}
          favorite={favoriteList}
          setFavorite={setFavoriteList}
        />
      </div>
    </div>
  );
};

export default SearchBox;
