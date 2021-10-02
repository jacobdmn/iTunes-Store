import React from "react";
import Result from "./result";
import { Howl, Howler } from "howler";

const Results = ({ results, favorite, setFavorite }) => {
  //// returns unique results, so we wont have a problem with keys.. this line is really valuable
  const unique = (ARR = [], KEY) => [
    ...new Map(ARR.map((item) => [item[KEY], item])).values(),
  ];
  results = unique(results, "trackId");

  return (
    <>
      {results.length !== 0
        ? results.map((song, index) => {
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
                key={song.trackId}
                song={song}
                playSound={() => playSong()}
                loveFunc={() => {
                  song.love = !song.love;
                  if (song.love) {
                    if (!favorite.includes(song))
                      setFavorite((prev) => [...prev, song]);
                    return;
                  } else {
                    setFavorite((prev) =>
                      prev.filter((obj) => obj.trackId !== song.trackId)
                    );
                    favorite.length === 0 && setFavorite([]);
                  }
                }}
              />
            );
          })
        : ""}
    </>
  );
};

export default Results;
