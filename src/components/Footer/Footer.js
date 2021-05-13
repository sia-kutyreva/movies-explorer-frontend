import React from 'react';
import './Footer.css';

function Footer(props) {
  return (
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2021</p>
        <nav className="footer__navigation">
          <ul className="footer__list">
            <li className="footer__list-element">
              <a className="footer__list-link" href="https://praktikum.yandex.ru/" target="blank">Яндекс.Практикум</a>
            </li>
            <li className="footer__list-element">
              <a className="footer__list-link" href="https://github.com/" target="blank">Github</a>
            </li>
            <li className="footer__list-element">
              <a className="footer__list-link" href="https://www.facebook.com/" target="blank">Facebook</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
