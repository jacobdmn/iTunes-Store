import React, { useRef, useState } from "react";
import Result from "./result";

const Searchbox = ({ data, setData }) => {
  const refContainer = useRef("null");
  const [trueLove, setTrueLove] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    data = [];
    const url = `https://itunes.apple.com/search?term=${refContainer.current.value}&media=music`;

    fetch(url, { METHOD: "GET" })
      .then((res) => res.json())
      .then((songs) => {
        songs = songs.results;
        if (songs) {
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
                loved: false,
              },
            ];
          }
        }
        setData(data);
      })
      .catch((err) => alert("ARE U OKEY?? NO SUCH SONG MAN !"));
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
