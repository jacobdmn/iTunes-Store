import React, { useState } from "react"; //, { useEffect, useState }
import Result from "./result";
import { Howl, Howler } from "howler";

const Results = ({ results, favorite, setFavorite }) => {
  //// returns unique results, so we wont have a problem with keys.. this line is really valuable
  // const unique = (ARR = [{}], KEY = "") => [
  //   ...new Map(ARR.map((item) => [item[KEY], item])).values(),
  // ];
  // results = unique(results, "trackId");

  // results.sort((a, b) => a.trackId > b.trackId);

  //// NOTIFICATION ON/OFF
  const [notification, setNotification] = useState(false);
  //// PLAY SOUND FUNCTION
  const playSong = (AUDIO = "") => {
    setNotification((prev) => !prev);
    setTimeout(() => setNotification((prev) => !prev), 3000);
    const sound = new Howl({ src: [AUDIO], volume: 0.5 });
    sound.once("load", function () {
      Howler.stop();
      sound.fade(0, 1, 5000);
      sound.play();
    });
  };

  //// LOVE FUNCTION
  const loveFunc = (
    track = [],
    fav = [{ x: 1 }, { x: 2 }],
    setFav = () => {}
  ) => {
    track.love = !track.love;
    if (track.love) {
      track.trackId = new Date().getTime();
      setFav((prev) => [track, ...prev]);
    } else {
      setFav((prev) => prev.filter((obj) => obj.trackId !== track.trackId));
      fav.length === 0 && setFav([]);
    }
    // setFav((prev) => prev.sort((a, b) => a.trackId > b.trackId));
    console.log(5);
  };

  return (
    <>
      <div className={notification ? "notif notification" : "notif"}>
        <h4>Loading...</h4>
      </div>
      {results.length
        ? results.map((song) => (
            <Result
              key={song.trackId.toString()}
              song={song}
              playSound={() => playSong(song.audio)}
              loveFunc={() => loveFunc(song, favorite, setFavorite)}
            />
          ))
        : favorite.map((song) => (
            <Result
              key={song.trackId.toString()}
              song={song}
              playSound={() => playSong(song.audio)}
              loveFunc={() => loveFunc(song, favorite, setFavorite)}
            />
          ))}
    </>
  );
};

export default Results;
