import React, { useContext, useEffect } from "react";
import Result from "./result";
import { Howl, Howler } from "howler";
import { UserContext } from "../data";

const History = () => {
  const { favoriteList, setFavoriteList } = useContext(UserContext);
  useEffect(() => {
    const fav = localStorage.getItem("favorite");
    if (fav) setFavoriteList(JSON.parse(fav));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favoriteList));
  });
  return (
    <div className='history-container'>
      <div className='searchBox'>
        <h2>
          Songs You loved
          <div className='separator'></div>
        </h2>
      </div>
      <div className='results'>
        {favoriteList.length !== 0
          ? favoriteList.map((song, index) => {
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
                    if (song.love && !favoriteList.includes(song))
                      setFavoriteList((prev) => [...prev, song]);
                    else {
                      setFavoriteList((prev) =>
                        prev.filter((obj) => obj.id !== song.id)
                      );
                      favoriteList.length === 0 && setFavoriteList([]);
                    }
                  }}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default History;
