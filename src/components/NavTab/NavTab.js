import React from 'react';
import './NavTab.css';

function NavTab(props) {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li className="navtab__list-element">
          <a className="navtab__list-item" href="#about-project">О проекте</a>
        </li>
        <li className="navtab__list-element">
          <a className="navtab__list-item" href="#techs" >Технологии</a>
        </li>
        <li className="navtab__list-element">
          <a className="navtab__list-item" href="#student" >Студент</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
