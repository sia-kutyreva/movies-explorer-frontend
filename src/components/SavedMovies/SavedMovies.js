import React from 'react';
import './SavedMovies.css';
import MovieCardList from '../MoviesCardList/MovieCradList';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import savedMoviesArray from '../../utils/savedMovies';

function SavedMovies({
  isMobileMenuOpen,
  isLoading,
  setIsLoading
}) 
{
  const countMovies = (savedMoviesArray.length > 11) ? true : false;
  return (
    <>
      <SearchForm 
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="saved-movies">
        <MovieCardList
          savedMoviesArray={savedMoviesArray}
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
      </div>
    </>
  );
}

export default SavedMovies;
