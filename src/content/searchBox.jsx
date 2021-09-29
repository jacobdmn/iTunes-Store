import React from "react";

const Searchbox = () => {
  return (
    <div className='search-container'>
      <div className='searchBox'>
        <h2>
          <input
            type='text'
            name='song'
            id='song'
            placeholder='Get Your song'
          />
          <div className='separator'></div>
        </h2>
      </div>
      <div className='results'>
        <div className='result'>
          <div className='song-pic'></div>
          <div className='song-title'></div>
          <div className='song-artist'></div>
          <button className='love'>
            <img src='./imgs/love.svg' alt='' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbox;
