import React, { useRef, useState } from "react";
import Result from "./result";

const Searchbox = ({ data, setData }) => {
  const refContainer = useRef("null");
  const [trueLove, setTrueLove] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    const url = `https://itunes.apple.com/search?term=${refContainer.current.value}&media=music`;

    fetch(url, { METHOD: "GET" })
      .then((res) => res.json())
      .then((songs) => {
        songs = songs.results;
        data = [
          {
            id: 0,
            title: "",
            album: "",
            artist: "",
            artistId: "",
            audio: "",
            image: "",
            love: "",
          },
        ];
        for (let i = 0; i <= 30; i++) {
          // data[i].id = songs[i].trackId;
          data[i].title = songs[i].trackName;
          data[i].album = songs[i].collectionName;
          data[i].artist = songs[i].artistName;
          data[i].artistId = songs[i].artistId;
          data[i].audio = songs[i].previewUrl;
          data[i].image = songs[i].artworkUrl30;
          data[i].love = false;
        }
        setData(data);
        console.log(songs);
      });
    console.log(refContainer);
    // alert(url);
  };

  const loved = (ID) => {
    setTrueLove(data[ID - 1].love);
    data[ID - 1].love = !data[ID - 1].love;
    setData(data);
    // alert(data[ID].loved);
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
