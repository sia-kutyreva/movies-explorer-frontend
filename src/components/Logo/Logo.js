import React from 'react';
import logo from '../../images/logo.svg';
import './Logo.css';
import { Link } from 'react-router-dom';

function Logo() {
  return (
      <Link to="/" className="logo">
        <img className="logo__image" src={logo} alt="Логотип" />
      </Link>
  );
}

export default Logo;
