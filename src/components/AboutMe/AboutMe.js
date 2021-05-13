import React from 'react';
import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import aboutMeFoto from '../../images/foto.jpg';

function AboutMe(props) {
  return (
    <section className="about-me" id="student">
      <SectionTitle className='' title='Студент' />
      <div className="about-me__container">
        <h3 className="about-me__name">Виталий</h3>
        <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
        <p className="about-me__text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. 
          Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
          С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
          начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <ul className="about-me__links">
          <li className="about-me__link">
            <a className="about-me__link-item" href="https://github.com/sia-kutyreva" target="blank">Github</a>
          </li>
        </ul>
        <img className="about-me__foto" src={aboutMeFoto} alt="фото" />
      </div>
    </section>
  );
}

export default AboutMe;
