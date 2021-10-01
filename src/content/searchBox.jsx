import React, { useContext } from "react";
import Result from "./result";
import { Howl, Howler } from "howler";
import { UserContext } from "../data";

const SearchBox = () => {
  /// CONTEXT API HOOK, DATA SHARABLE
  const {
    data_GLOBAL,
    handleSearch,
    refContainer,
    setFavoriteList,
    favoriteList,
  } = useContext(UserContext);

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
        {data_GLOBAL.length !== 0
          ? data_GLOBAL.map((song, index) => {
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
                  loveFunc={() => {
                    song.love = !song.love;
                    if (song.love && !favoriteList.includes(song))
                      setFavoriteList((prev) => [...prev, song]);
                    else {
                      setFavoriteList((prev) =>
                        prev.filter((obj) => obj.id !== song.id)
                      );
                      favoriteList.length === 0 && setFavoriteList([]);
                    }
                  }}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default SearchBox;
