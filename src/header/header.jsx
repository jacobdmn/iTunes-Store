import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleHeart,
  faUserGroupCrown,
} from "@fortawesome/free-solid-svg-icons";

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
            {/* <FontAwesomeIcon icon={faMagnifyingGlass} />  */}
            Search
          </a>
        </div>
        <div className='history'>
          <a href=''>
            {/* <FontAwesomeIcon icon={faCircleHeart} /> */}
            Favorite
          </a>
        </div>
        <div className='statistics'>
          <a href=''>
            {/* <FontAwesomeIcon icon={faUserGroupCrown} />  */}
            Statistics
          </a>
        </div>
      </div>
    </header>
  );
};

export default MyHeader;
