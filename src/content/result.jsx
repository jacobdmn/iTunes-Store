import React, { useState, useEffect, useRef } from "react";

const Result = ({
  song: { id, title, artist, album, image, love, audio },
  lovedFunc,
  playSound,
}) => {
  return (
    <div className='result' onClick={playSound}>
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
          <h5>Album: {album}</h5>
        </div>
      </div>
      <button id='love' className='love' onClick={lovedFunc}>
        <svg
          className={love ? "loved" : ""}
          version='1.1'
          viewBox='0 0 512 512'
          width='512px'
          xmlns='http://www.w3.org/2000/svg'>
          <g id='_x31_66_x2C__Heart_x2C__Love_x2C__Like_x2C__Twitter'>
            <g>
              <path d='M365.4,59.628c60.56,0,109.6,49.03,109.6,109.47c0,109.47-109.6,171.8-219.06,281.271    C146.47,340.898,37,278.568,37,169.099c0-60.44,49.04-109.47,109.47-109.47c54.73,0,82.1,27.37,109.47,82.1    C283.3,86.999,310.67,59.628,365.4,59.628z' />
            </g>
          </g>
          <g id='Layer_1' />
        </svg>
      </button>
    </div>
  );
};

export default Result;
