import React from "react";
import Result from "./result";

const History = ({ favoriteList }) => {
  return (
    <div className='history-container'>
      <div className='searchBox'>
        <h2>
          Songs You loved
          <div className='separator'></div>
        </h2>
      </div>
      <div className='results'>
        {favoriteList.length > 0 ? (
          favoriteList.map((song) => <Result key={song.id} song={song} />)
        ) : (
          <h4 style={{ padding: "1em" }}>NO SONGS LOVED YET</h4>
        )}
      </div>
    </div>
  );
};

export default History;
