import React from "react";
import { createContext, useState, useRef } from "react";
import axios from "axios";

export const UserContext = createContext();

export const loveFunc = (
  index,
  song,
  love,
  data_GLOBAL,
  favoriteList,
  setFavoriteList
) => {
  love = !love;
  // setData_GLOBAL(data_GLOBAL);
  if (love && !favoriteList.includes(song))
    setFavoriteList((prev) => [...prev, song]);
  else {
    setFavoriteList((prev) =>
      prev.filter((obj) => obj.trackId !== song.trackId)
    );
    favoriteList.length === 0 && setFavoriteList([]);
  }
};
export const UserProvider = ({ children }) => {
  const [data_GLOBAL, setData_GLOBAL] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const refContainer = useRef("..");

  const handleSearch = (e) => {
    e.preventDefault();
    setData_GLOBAL([]);
    const url = `https://itunes.apple.com/search?term=${refContainer.current.value}&media=music`;
    // const cors = `https://cors-anywhere.herokuapp.com`;

    /// FETCHIN API DATA
    axios
      .get(url)
      .then((songs) => {
        songs = songs.data.results;
        if (songs.length === 0) setData_GLOBAL([]);
        /// SONGS ARE IN results OBJECT

        for (var i = 0; i <= 10; i++) {
          let {
            trackId,
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
              trackId,
              title,
              album,
              artist,
              artistId,
              audio,
              image,
              love: false,
            },
          ]);
          if (favoriteList.includes(data_GLOBAL[i])) {
            data_GLOBAL[i].love = true;
            setData_GLOBAL(data_GLOBAL[i]);
          }
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
