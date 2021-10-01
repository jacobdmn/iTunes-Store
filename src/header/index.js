import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCog,
  faHeart,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
const MyHeader = () => {
  return (
    <header>
      <div className='Logo'>
        <h1>
          <img
            src='https://cdn4.iconfinder.com/data/icons/miu-black-social-2/60/itunes-1024.png'
            alt='iTunes'
          />
        </h1>
      </div>
      <div className='menu'>
        <div className='search-bar active'>
          <a href='/'>
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </div>
        <div className='history'>
          <a href='/favorite'>
            <FontAwesomeIcon icon={faHeart} />
          </a>
        </div>
        <div className='statistics'>
          <a href='/statistics'>
            <FontAwesomeIcon icon={faUserCog} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default MyHeader;
