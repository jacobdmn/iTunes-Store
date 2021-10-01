import React, { useRef, useContext } from "react";
import Result from "./result";
import { Howl, Howler } from "howler";
import { UserContext } from "../data";

const SearchBox = () => {
  /// CONTEXT API HOOK, DATA SHARABLE
  const { data_GLOBAL, setData_GLOBAL } = useContext(UserContext) || {};
  const refContainer = useRef("..");

  const handleSearch = (e) => {
    e.preventDefault();
    setData_GLOBAL([]);
    const url = `https://itunes.apple.com/search?term=${refContainer.current.value}&media=music`;

    /// FETCHIN API DATA
    fetch(url, { METHOD: "GET" })
      .then((res) => res.json())
      .then((songs) => {
        /// SONGS ARE IN results OBJECT
        if (songs.results.length === 0) setData_GLOBAL([]);
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

          setData_GLOBAL([
            ...data_GLOBAL,
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
          ]);
        }
      })
      .catch((err) => "");
  };

  return (
    <div className='search-container'>
      <div className='searchBox'>
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
      </div>
      <div className='results'>
        {data_GLOBAL
          ? data_GLOBAL.map((song) => {
              const playSong = () => {
                const sound = new Howl({ src: [song.audio], volume: 0.5 });
                sound.once("load", function () {
                  Howler.stop();
                  sound.fade(0, 1, 5000);
                  sound.play();
                });
              };
              return (
                <Result
                  key={song.id}
                  song={song}
                  playSound={() => playSong()}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default SearchBox;
