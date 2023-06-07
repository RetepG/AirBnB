// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import './Navigation.css';
// import SignupFormModal from '../SignupFormModal';

// function Navigation({ isLoaded }) {
//     const sessionUser = useSelector(state => state.session.user);

//     let sessionLinks;
//     if (sessionUser) {
//         sessionLinks = (
//             <li>
//                 <ProfileButton user={sessionUser} />
//             </li>
//         );
//     } else {
//         sessionLinks = (
//             <li>
//                 <OpenModalButton
//                     buttonText="Log In"
//                     modalComponent={<LoginFormModal />}
//                 />
//                 <OpenModalButton
//                     buttonText="Sign Up"
//                     modalComponent={<SignupFormModal />}
//                 />
//             </li>
//         );
//     }

//     return (
//         <ul>
//             <li>
//                 <NavLink exact to="/">Home</NavLink>
//             </li>
//             {isLoaded && sessionLinks}
//         </ul>
//     );
// }

// export default Navigation;

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
