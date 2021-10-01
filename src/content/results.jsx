import React from "react";
import Result from "./result";
import { Howl, Howler } from "howler";

const Results = ({ results, favorite, setFavorite }) => {
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
                key={song.id}
                song={song}
                playSound={() => playSong()}
                loveFunc={() => {
                  song.love = !song.love;
                  if (song.love && !favorite.includes(song))
                    setFavorite((prev) => [...prev, song]);
                  else {
                    setFavorite((prev) =>
                      prev.filter((obj) => obj.id !== song.id)
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
