import React from 'react';
import './Techs.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function Techs(props) {
  return (
    <section className="techs" id="techs">
      <SectionTitle className='section-title_techs' title='Технологии' />
      <div className="techs__container">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__list-element">HTML</li>
          <li className="techs__list-element">CSS</li>
          <li className="techs__list-element">JS</li>
          <li className="techs__list-element">React</li>
          <li className="techs__list-element">Git</li>
          <li className="techs__list-element">Express.js</li>
          <li className="techs__list-element">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
