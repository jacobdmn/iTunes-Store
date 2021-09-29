import React from "react";
import Result from "./result";

const Searchbox = ({ data }) => {
  return (
    <div className='search-container'>
      <div className='searchBox'>
        <h2>
          <input
            type='text'
            name='song'
            id='song'
            placeholder='Write here your searched song..'
          />
          <div className='separator'></div>
        </h2>
      </div>
      <div className='results'>
        {data.map((song) => (
          <Result key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Searchbox;
