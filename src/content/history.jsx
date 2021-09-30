import React from "react";
import Result from "./result";

const History = ({ data, favoriteList }) => {
  return (
    <div className='history-container'>
      <div className='searchBox'>
        <h2>
          Songs You loved
          <div className='separator'></div>
        </h2>
      </div>
      <div className='results'>
        {favoriteList.map((song) => (
          <Result key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default History;
