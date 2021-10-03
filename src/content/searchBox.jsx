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
    setResultsNumber,
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
        <h6 className='cors' onClick={(e) => e.target.closest("h6").remove()}>
          <a
            href='https://cors-anywhere.herokuapp.com/corsdemo'
            target='_blank'
            rel='noreferrer'>
            CLICK HERE TO ALLOW RESULTS
          </a>
        </h6>
      </h2>
      {data_GLOBAL.length !== 0 && (
        <div className='results'>
          <Results
            key={new Date().getTime()}
            results={data_GLOBAL}
            favorite={favoriteList}
            setFavorite={setFavoriteList}
            setResultsNumber={setResultsNumber}
            handleSearch={handleSearch}
          />
          <div
            className='showMore'
            onClick={(e) => {
              setResultsNumber((prev) => prev + 5);
              handleSearch(e, true);
            }}>
            show more...
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
