import React from 'react';
import './Navigation.css';
import { NavLink, Link } from 'react-router-dom';
import mobileMenuImg from '../../images/mobile-menu.svg';
import signinButton from '../../images/signin-button.svg';
import profileButton from '../../images/profile.svg';

function Navigation(props) 
{

  const openSideBar = () => {
    props.clickMenu();
  }

  return (
    !props.loggedIn ? (
      <div className="navigation">
        <nav className="navigation__container">
          <Link to="/signup" className="navigation__link-signup">Регистрация</Link>
          <Link to="/signin" className="navigation__button-signin">
            <img className="navigation__img-signin" src={signinButton} alt="кнопка вход"/>
          </Link>
        </nav>
      </div>
    ) : ( props.mobileMenu ? (
      <div className="navigation">
        <button className="navigation__button-menu" onClick={openSideBar}>
          <img className="navigation__button-img" src={mobileMenuImg} alt="иконка меню"/>
        </button>
      </div>
    ) : (
      <div className="navigation">
        <nav className="navigation__container">
          <NavLink to="/movies" activeClassName="navigation__link_type_active" className="navigation__link">Фильмы</NavLink>
          <NavLink to="/saved-movies" activeClassName="navigation__link_type_active" className="navigation__link">Сохраненные фильмы</NavLink>
          <NavLink to="/profile" activeClassName="navigation__link_type_active-img" className="navigation__link-img">
            <img className="navigation__button-profile" src={profileButton} alt="иконка аккаунт"/>
          </NavLink>
        </nav>
      </div>
    )

    )
  )
}

export default Navigation;
