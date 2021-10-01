import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCog,
  faHeart,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
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
        <NavLink exact to='/' activeClassName='active'>
          <FontAwesomeIcon icon={faSearch} />
        </NavLink>
        <NavLink exact to='/favorite' activeClassName='active'>
          <FontAwesomeIcon icon={faHeart} />
        </NavLink>
        <NavLink exact to='/statistics' activeClassName='active'>
          <FontAwesomeIcon icon={faUserCog} />
        </NavLink>
      </div>
    </header>
  );
};

export default MyHeader;
