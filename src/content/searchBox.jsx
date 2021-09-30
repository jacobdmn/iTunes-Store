import React, { useRef, useState } from "react";
import Result from "./result";

const Searchbox = ({ data, setData }) => {
  const refContainer = useRef("null");
  const handleSearch = (e) => {
    e.preventDefault();
    data = [];
    const url = `https://itunes.apple.com/search?term=${refContainer.current.value}&media=music`;

    /// FETCHIN API DATA
    fetch(url, { METHOD: "GET" })
      .then((res) => res.json())
      .then((songs) => {
        /// SONGS ARE IN results OBJECT
        songs = songs.results;
        for (var i = 0; i <= 10; i++) {
          let {
            trackId: id,
            trackName: title,
            collectionName: album,
            artistName: artist,
            artistId,
            previewUrl: audio,
            artworkUrl30: image,
          } = songs[i];

          data = [
            ...data,
            {
              id,
              title,
              album,
              artist,
              artistId,
              audio,
              image,
              love: false,
            },
          ];
        }
        setData(data);
      })
      .catch((err) => alert("ARE U OKEY?? NO SUCH SONG MAN !"));
  };

  const loved = (song) => {
    song.love = !song.love;
    // data.find((obj) => obj.id === ID).love = true;
    setData(data);
  };
  return (
    <div className='search-container'>
      <div className='searchBox'>
        <h2>
          <form onSubmit={handleSearch}>
            <input
              ref={refContainer}
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
                loved(song);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Searchbox;
