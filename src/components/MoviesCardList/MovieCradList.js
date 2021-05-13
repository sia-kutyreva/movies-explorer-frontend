import React from 'react';
import './MovieCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import Preloader from '../Preloader/Preloader';

function MovieCardList({
  savedMoviesArray,
  initialMoviesArray,
  setIsLoading,
  isLoading
}) 
{

  const savedMoviePage = savedMoviesArray ? true : false;

  return (
    <div className="section-movies page__section-movies_path_movie">
      <ul className="movies-list">
        { isLoading ? ( <Preloader /> ) :
          (savedMoviePage ? (
            savedMoviesArray.map((movie) => (
              <MovieCard 
                key={movie._id}
                movie={movie}
              />
            ))
          ) : (
            initialMoviesArray.map((movie, i) => (
              <MovieCard 
                key={i}
                movie={movie}
              />
            ))
          ))
        }
      </ul>
    </div>
  );
}

export default MovieCardList;
