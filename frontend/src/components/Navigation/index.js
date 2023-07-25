import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <div className="Nav-bar">
      <li>
        <NavLink className="Home" exact to="/"><i class="fa-solid fa-house-user"></i>  OverNight Stay</NavLink>
      </li>
      {isLoaded && (
        <li className="Profile">
          <ProfileButton user={sessionUser}/>
        </li>
      )}
      </div>
    </ul>
  );
}

export default Navigation;
