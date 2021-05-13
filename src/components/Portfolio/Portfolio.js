import React from 'react';
import './Portfolio.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import arrow from '../../images/arrow.svg';

function Portfolio(props) {
  return (
    <section className="portfolio">
      <SectionTitle className="section-title_portfolio" title="Портфолио" />
      <ul className="portfolio__list">
        <li className="portfolio__link">
          <a className="portfolio__link-item" href="https://github.com/sia-kutyreva/how-to-learn" target="blank">Статичный сайт
            <img className="portfolio__link-img" alt="стрелка" src={arrow} />
          </a>
        </li>
        <li className="portfolio__link">
          <a className="portfolio__link-item" href="https://github.com/sia-kutyreva/russian-travel" target="blank">Адаптивный сайт
            <img className="portfolio__link-img" alt="стрелка" src={arrow} />
          </a>
        </li>
        <li className="portfolio__link">
          <a className="portfolio__link-item" href="https://github.com/sia-kutyreva/react-mesto-api-full" target="blank">Одностраничное приложение
            <img className="portfolio__link-img" alt="стрелка" src={arrow} />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
