import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [createSpot, setCreateSpot] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  useEffect(() => {
    if (sessionUser) setCreateSpot(true)
    if (!sessionUser) setCreateSpot(false)
  }, [sessionUser])

  return (
    <>
      <div className="Profile-Button-Wrapper">
        <button className="profile-buttons" onClick={openMenu}>
          <i id="Profile-Bars" className="fa-solid fa-bars"></i>
          <i id="Profile-Button-Pic" className="fa-solid fa-circle-user"></i>
        </button>
      </div>
      <div className="Create-Spot-Wrapper">
        <NavLink className="Create-new" exact to="/spots/new">
          {createSpot ? <>Create a New Spot</> : null}
        </NavLink>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="Dropdown-Menu">
              <li>Hello, {user.username}</li>
              <li>{user.email}</li>
              <li className="Manage-spots">
                <NavLink className="Manage-spot-text" exact to="/spots/current" onClick={closeMenu}>Manage Spots</NavLink>
              </li>
              <li>
                <button className="LogOut-Button" onClick={logout}><i class="fa-solid fa-right-from-bracket"></i> Log Out</button>
              </li>
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <i class="fa-solid fa-right-to-bracket"></i>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="container-2">
              <i class="fa-solid fa-user-plus"></i>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
