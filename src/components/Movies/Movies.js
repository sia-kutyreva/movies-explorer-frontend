import React, { useEffect, useState } from 'react';
import './Movies.css';
import MovieCardList from '../MoviesCardList/MovieCradList';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import { useFormWithValidation } from '../../utils/useFormHook';
import Preloader from '../Preloader/Preloader';

function Movies({
  isMobileMenuOpen,
  isSearching,
  setIsSearching,
  handleSubmitMovies,
  notAction,
  isSearchFail,
  filteredMovies,
  isMovieSaved,
  onSavedMovie,
  removeMovie,
  width,
  maxNumberOfCards,
  numberOfCards,
  isSavedArray,
  setIsSavedArray,
  searchMassages,
  setIsSearchiFail,
  savedMovies,
}) 
{
  const { values, handleChange } = useFormWithValidation();
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [movieArray, setMovieArray] = useState([]);
  const [isShort, setIsShort] = useState(false);

  const onSubmit = (evt) => {
    evt.preventDefault();
    setIsSearching(true);
    handleSubmitMovies(values.movie, isShort);
  }

  const handleToggleShort = (short) => {
    handleSubmitMovies(values.movie, short);
    setIsShort(short);
  }

  const checkArrayLength = () => {
    let movieArrayLength = filteredMovies.length;
    if (movieArrayLength === 0 ) {
      setShowMoreButton(false);
    } else if (movieArrayLength <= numberOfCards) {
      setShowMoreButton(false);
      setMovieArray(filteredMovies);
      setIsSavedArray(false);
    } else  if (movieArrayLength > maxNumberOfCards) {
      filteredMovies.splice(maxNumberOfCards);
      setShowMoreButton(true);
      setMovieArray(filteredMovies.slice(0, numberOfCards));
      setIsSavedArray(false);
    } else {
      setShowMoreButton(true);
      setMovieArray(filteredMovies.slice(0, numberOfCards));
      setIsSavedArray(false);
    }
  }

  const onClickMoreButton = () => {
    setMovieArray(filteredMovies.slice(0, movieArray.length + numberOfCards));
    if ((filteredMovies.length - numberOfCards) <= movieArray.length) {
      setShowMoreButton(false);
    }
  }

  const goOut = () => {
    setIsSearchiFail(false);
  }

  useEffect(() => {
    checkArrayLength();
  }, [filteredMovies, numberOfCards]);

  useEffect(() => {
    return goOut();
  }, []);


  return (
    <>
      <SearchForm 
        isMobileMenuOpen={isMobileMenuOpen}
        values={values}
        handleChange={handleChange}
        onSubmit={onSubmit}
        handleToggleShort={handleToggleShort}
        handleSearchFail={setIsSearchiFail}
      />
      <section className="movies">
        { notAction ? null : (
            isSearching ? <Preloader /> : (
              isSearchFail ? <span className="movie__search-fail">{searchMassages}</span> : (
                <MovieCardList 
                  moviesArray={movieArray}
                  isMovieSaved={isMovieSaved}
                  onSavedMovie={onSavedMovie}
                  removeMovie={removeMovie}
                  width={width}
                  isSavedArray={isSavedArray}
                  savedMovies={savedMovies}
                />
              )
            )
          )
        }
        {
          showMoreButton ? (
            <Button 
              buttonClassName="button_movies-list movies__button"
              type="button"
              buttonText="Ещё"
              onClick={onClickMoreButton}
            />
          ) : null
        }
      </section>
    </>
  );
}

export default Movies;
