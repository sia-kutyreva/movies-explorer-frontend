import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header(props) 
{
  const { pathname } = useLocation();

  const headerMarginClass = (pathname === "/profile") ? ("page__header_path_profile") : 
    ((pathname === "/saved-movies" || pathname === "/movies") ? ("page__header_path_movie") : ("page__header_path_main"));

  return (
    <header className={`header ${headerMarginClass}`}>
      <div className="header__container">

        <Logo />
        <Navigation 
          loggedIn={true}
          mobileMenu={props.mobileMenu}
          clickMenu={props.clickMenu} 
        />
      </div>
    </header>
  );
}

export default Header;
