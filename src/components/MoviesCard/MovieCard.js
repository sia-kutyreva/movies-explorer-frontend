import React, { useState } from 'react';
import './MovieCard.css';
import iconSaved from '../../images/save.svg'
import iconNoSaved from '../../images/no-save.svg'

function MovieCard(props) {
  const { name, timing, image } = props.movie;
  const [isMovieSaved, setIsMovieSaved] = useState(false);

  function toggleSaved() {
    if (isMovieSaved) {
      setIsMovieSaved(false);
    } else {
      setIsMovieSaved(true);
    }
  }

  return (
    <li className="card">
      <div className="card__info">
        <h3 className="card__title">{name}</h3>
        <p className="card__timing">{timing}</p>
        <img className="card__icon-img" alt="иконка сохранено" onClick={toggleSaved} src={isMovieSaved ? iconSaved : iconNoSaved} />
      </div>
      <img className="card__preview" alt="превью фильма" src={image} />
    </li>
  );
}

export default MovieCard;
