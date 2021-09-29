import React from "react";

const Result = ({ song: { title, artist, album, image } }) => {
  return (
    <div className='result'>
      <div className='song-pic'>
        <img src={image} alt='SONG PIC' />
      </div>
      <div className='details'>
        <div className='song-title'>
          <h3>{title}</h3>
        </div>
        <div className='song-artist'>
          <h4>BY: {artist}</h4>
        </div>
        <div className='song-album'>
          <h4>Album: {album}</h4>
        </div>
      </div>
      <button className='love'>
        <img src='./imgs/love_icon.svg' alt='' />
      </button>
    </div>
  );
};

export default Result;
