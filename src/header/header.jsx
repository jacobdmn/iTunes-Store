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
          <a href=''>Search a song</a>
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
