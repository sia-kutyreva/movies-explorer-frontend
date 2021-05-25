import React from 'react';
import './MovieCard.css';
import { useLocation } from 'react-router-dom';
import iconSaved from '../../images/save.svg'
import iconNoSaved from '../../images/no-save.svg'
import delCard from '../../images/delCard.svg'

function MovieCard({ 
  movie,
  onSavedMovie,
  removeMovie,
 }) 
 {
  const { pathname } = useLocation();

  const movieName = movie.nameRU !== 'Название не указано' ? movie.nameRU : movie.nameEN;
  const duration  = convertMovieDuration(movie.duration);
  function convertMovieDuration(duration)  {
    const hours = Math.floor(duration/60);
    const minutes = Math.floor(duration % 60);
    const formated = `${hours}ч ${minutes}м`
    return formated
  }

  function onDelete() {
    removeMovie(movie);
  }

  function onSaved() {
    onSavedMovie(movie);
  }

  function toggleSavedMovie() {
    if (movie.saved) {
      onDelete();
    } else {
      onSaved();
    }
  }

  function handleClicklImage() {
    window.open(movie.trailer, '_blank');
  }

  return (
    <li className="card">
      <div className="card__info">
        <h3 className="card__title">{movieName}</h3>
        <p className="card__timing">{duration}</p>
        {
          pathname === "/saved-movies" ? (
            <img className="card__icon-img" alt="иконка удалить" onClick={onDelete} src={delCard} />
          ) : (
            <img className="card__icon-img" alt="иконка сохранено" onClick={toggleSavedMovie} src={movie.saved ? iconSaved : iconNoSaved} />
          )
        }
      </div>
      <img className="card__preview" alt={movieName} src={movie.image} onClick={handleClicklImage} />
    </li>
  );
}

export default MovieCard;
