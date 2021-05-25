import React from 'react';
import './MovieCardList.css';
import MovieCard from '../MoviesCard/MovieCard';

function MovieCardList({
  moviesArray,
  isMovieSaved,
  onSavedMovie,
  removeMovie,
  isSavedArray,
  savedMovies
}) 
{

  return (
    <div className="section-movies page__section-movies_path_movie">
      <ul className="movies-list">
        {moviesArray.map((movie) => (
              <MovieCard 
                key={isSavedArray ? movie._id : movie.movieId}
                movie={movie}
                isMovieSaved={isMovieSaved}
                onSavedMovie={onSavedMovie}
                removeMovie={removeMovie}
                savedMovies={savedMovies}
              />
            ))}
      </ul>
    </div>
  );
}

export default MovieCardList;
