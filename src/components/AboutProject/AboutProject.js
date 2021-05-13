import React from 'react';
import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject(props) {
  return (
    <section className="about-project" id="about-project">
      <SectionTitle className='' title='О проекте' />
      <ul className="about-project__table">
          <li className="about-project__table-raw">
            <h3 className="about-project__table-header">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__table-element">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="about-project__table-raw">
            <h3 className="about-project__table-header">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__table-element">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
      </ul>
      <div className="about-project__diagram">
            <p className="about-project__diagram-element about-project__diagram-element_green">1 неделя</p>
            <p className="about-project__diagram-element about-project__diagram-element_white">4 недели</p>
            <p className="about-project__diagram-element">Back-end</p>
            <p className="about-project__diagram-element">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
