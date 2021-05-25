import React from 'react';
import './Movies.css';
import MovieCardList from '../MoviesCardList/MovieCradList';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import initialMovies from '../../utils/initialMovies';

function Movies({
  isMobileMenuOpen,
  isLoading,
  setIsLoading
}) 
{
  const countMovies = (initialMovies.length > 11) ? true : false;


  return (
    <>
      <SearchForm 
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <section className="movies">
        {

        }
        <MovieCardList 
          initialMoviesArray={initialMovies}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {
          countMovies ? (
            <Button 
              buttonClassName="button_movies-list movies__button"
              type="button"
              buttonText="Ещё"
            />
          ) : null
        }
      </section>
    </>
  );
}

export default Movies;
