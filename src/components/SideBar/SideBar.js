import React from 'react';
import './SideBar.css';
import { NavLink, Link } from 'react-router-dom';
import profileButton from '../../images/profile.svg';
import closeButton from '../../images/close-button.svg';

function SideBar({
  isOpen,
  onClose
}) {

  const sideBarOpened = isOpen ? "sidebar_opened" : "";
  const sideBarContOpened = isOpen ? "sidebar__container_opend" : "";
  const closeButtonInactive = !isOpen ? "sidebar__close-button_inactive" : "";

  const closeSideBar = () => {
    onClose();
  }

  return (
    <div className={`sidebar ${sideBarOpened}`}>
      <nav className={`sidebar__container ${sideBarContOpened}`}>
        <button onClick={closeSideBar} className={`sidebar__close-button ${closeButtonInactive}`}>
          <img className="sidebar__close-button-img" src={closeButton} alt="кнопка закрыть"/>
        </button>
        <NavLink exact to="/" activeClassName="sidebar__link_type_active" className="sidebar__link" onClick={closeSideBar}>Главная</NavLink>
        <NavLink to="/movies" activeClassName="sidebar__link_type_active" className="sidebar__link" onClick={closeSideBar}>Фильмы</NavLink>
        <NavLink to="/saved-movies" activeClassName="sidebar__link_type_active" className="sidebar__link" onClick={closeSideBar}>Сохраненные фильмы</NavLink>
        <Link to="/profile" className="sidebar__link-img" onClick={closeSideBar}>
          <img className="sidebar__button-profile" src={profileButton} alt="иконка аккаунт"/>
        </Link>
      </nav>
    </div>
    
  )
}

export default SideBar;
