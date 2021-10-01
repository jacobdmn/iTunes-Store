import React from "react";
import { createContext, useState, useRef } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [data_GLOBAL, setData_GLOBAL] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  //   favoriteList.push(data_GLOBAL.filter((song) => song.love));
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

          setData_GLOBAL((previous) => [
            ...previous,
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
    <UserContext.Provider
      value={{
        data_GLOBAL,
        setData_GLOBAL,
        handleSearch,
        favoriteList,
        setFavoriteList,
        refContainer,
      }}>
      {children}
    </UserContext.Provider>
  );
};
