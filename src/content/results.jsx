import React, { useState } from "react"; //, { useEffect, useState }
import Result from "./result";
import { Howl, Howler } from "howler";

const Results = ({ results, favorite, setFavorite }) => {
  //// returns unique results, so we wont have a problem with keys.. this line is really valuable
  const unique = (ARR = [], KEY) => [
    ...new Map(ARR.map((item) => [item[KEY], item])).values(),
  ];
  results = unique(results, "trackId");

  //// NOTIFICATION ON/OFF
  const [notification, setNotification] = useState(false);
  //// PLAY SOUND FUNCTION
  const playSong = (AUDIO) => {
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
  const loveFunc = (track, fav, setFav) => {
    track.love = !track.love;
    if (track.love) {
      if (!fav.includes(track)) setFav((prev) => [...prev, track]);
      return;
    } else {
      setFav((prev) => prev.filter((obj) => obj.trackId !== track.trackId));
      fav.length === 0 && setFav([]);
    }
  };

  return (
    <>
      <div className={notification ? "notif notification" : "notif"}>
        <h4>Loading...</h4>
      </div>
      {results.length !== 0 &&
        results.map((song) => (
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
