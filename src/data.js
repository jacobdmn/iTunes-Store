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
  const [resultsNumber, setResultsNumber] = useState(9);
  const refContainer = useRef("..");

  const handleSearch = (e, showMore = false) => {
    e.preventDefault();
    !showMore && setData_GLOBAL([]);
    const searchValue = refContainer.current.value;
    const url = `https://itunes.apple.com/search?term=${searchValue}&media=music&limit=${resultsNumber}`;
    // const cors = `https://cors-anywhere.herokuapp.com`;

    /// if the user wrote, then deleted the input
    if (!refContainer.current.value) return;

    /// FETCHIN API DATA
    axios
      .get(url)
      .then((songs) => {
        if (songs.status === 200) {
          /// SONGS ARE IN results OBJECT
          songs = songs.data.results;

          //// IF ANSWER IS NOTHING
          if (songs.length === 0) setData_GLOBAL([]);

          //// Delete Repeated songs
          const unique = (ARR = [], KEY) => [
            ...new Map(ARR.map((item) => [item[KEY], item])).values(),
          ];
          songs = unique(songs, "trackId");

          for (var i = 0; i < songs.length; i++) {
            let {
              trackName,
              trackPrice,
              trackViewUrl,
              artworkUrl100: trackImage,
              collectionId: albumId,
              collectionName: albumName,
              artistName,
              artistId,
              previewUrl: audio,
            } = songs[i];

            trackName = trackName.substring(0, 80);
            albumName = albumName.substring(0, 80);
            artistName = artistName.substring(0, 60);
            setData_GLOBAL((previous) => [
              ...previous,
              {
                trackId: new Date().getTime(),
                trackName,
                trackPrice,
                trackImage,
                trackViewUrl,
                albumId,
                albumName,
                artistId,
                artistName,
                audio,
                love: false,
              },
            ]);
            /// just for confirmation security
            if (data_GLOBAL.includes(data_GLOBAL[i])) data_GLOBAL.pop();

            if (favoriteList.includes(data_GLOBAL[i])) {
              data_GLOBAL[i].love = true;
              setData_GLOBAL(data_GLOBAL[i]);
            }
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
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
        setResultsNumber,
      }}>
      {children}
    </UserContext.Provider>
  );
};
