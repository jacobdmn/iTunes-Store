import React, { useRef, useState } from "react";
import Result from "./result";
import { Howl, Howler } from "howler";

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
      .catch((err) => "");
  };

  const loved = (song) => {
    data.find((obj) => obj.id === song.id).love = !song.love;
    setData(data);
  };

  //// PLAY SOUND

  return (
    <div className='search-container'>
      <div className='searchBox'>
        <h2>
          <form onSubmit={handleSearch}>
            <input
              ref={refContainer}
              onChange={(e) => {
                e.preventDefault();
                e.target.value = refContainer.current.value;
                handleSearch(e);
              }}
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
          const playSong = () => {
            Howler.stop();
            const sound = new Howl({ src: [song.audio], volume: 0.5 });
            sound.once("load", function () {
              sound.fade(0, 1, 5000);
              sound.play();
            });
          };
          return (
            <Result
              key={song.id}
              song={song}
              lovedFunc={() => loved(song)}
              playSound={() => playSong()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Searchbox;
