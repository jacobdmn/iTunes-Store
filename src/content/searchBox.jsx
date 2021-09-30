import React, { useRef, useState } from "react";
import Result from "./result";

const Searchbox = ({ data, setData }) => {
  const refContainer = useRef("null");
  const [trueLove, setTrueLove] = useState();
  const handleSearch = (e) => {
    e.preventDefault();
    const url =
      "https://itunes.apple.com/search?music=" + refContainer.current.value;

    alert(url);
  };

  const loved = (ID) => {
    data[ID].loved = !data[ID].loved;
    setData(data);
    // alert(data[ID].loved);
  };
  return (
    <div className='search-container'>
      <div className='searchBox'>
        <h2>
          <form onSubmit={handleSearch}>
            <input
              rel={refContainer}
              type='text'
              id='song'
              placeholder='Write here your searched song..'
              autoFocus={true}
            />
          </form>
          <div className='separator'></div>
        </h2>
      </div>
      <div className='results'>
        {data.map((song) => {
          return (
            <Result
              key={song.id}
              song={song}
              lovedFunc={() => {
                loved(song.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Searchbox;
