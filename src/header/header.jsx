import React from "react";

const MyHeader = () => {
  return (
    <header>
      <div className='Logo'>
        <h1>
          <img src='./imgs/logo.svg' alt='' />
        </h1>
      </div>
      <div className='menu'>
        <div className='search-bar active'>
          <a href=''>
            <svg
              fill='none'
              height='24'
              stroke='#000'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              viewBox='0 0 24 24'
              width='24'
              xmlns='http://www.w3.org/2000/svg'>
              <circle cx='10.5' cy='10.5' r='7.5' />
              <line x1='21' x2='15.8' y1='21' y2='15.8' />
            </svg>
            Search a song
          </a>
        </div>
        <div className='history'>
          <a href=''>History</a>
        </div>
        <div className='statistics'>
          <a href=''>Statistics</a>
        </div>
      </div>
    </header>
  );
};

export default MyHeader;
