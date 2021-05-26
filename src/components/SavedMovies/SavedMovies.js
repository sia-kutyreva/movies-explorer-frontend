import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import MovieCardList from '../MoviesCardList/MovieCradList';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../Button/Button';
import { useFormWithValidation } from '../../utils/useFormHook';


function SavedMovies({
  isMobileMenuOpen,
  setIsSearchiFail,
  setIsSearching,
  removeMovie,
  savedMovies,
  width,
  maxNumberOfCards,
  numberOfCards,
  isSavedArray,
  setIsSavedArray,
  handleSubmitMovies,
  filteredSavedArray,
  isSearchFail,
  searchMassages,
}) {
  
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [movieArray, setMovieArray] = useState([]);
  const { values, handleChange } = useFormWithValidation();
  const [isShort, setIsShort] = useState(false);
  
  const array = (filteredSavedArray.length !== 0) ? filteredSavedArray : savedMovies;

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
    const movieArrayLength = array.length;
    if (movieArrayLength === 0 ) {
      setShowMoreButton(false);
    } else if (movieArrayLength <= numberOfCards) {
      setShowMoreButton(false);
      setMovieArray(array);
      setIsSavedArray(true);
    } else  if (movieArrayLength > maxNumberOfCards) {
      array.splice(maxNumberOfCards);
      setShowMoreButton(true);
      setMovieArray(array.slice(0, numberOfCards));
      setIsSavedArray(true);
    } else {
      setShowMoreButton(true);
      setMovieArray(array.slice(0, numberOfCards));
      setIsSavedArray(true);
    }
  }

  const onClickMoreButton = () => {
    setMovieArray(array.slice(0, movieArray.length + numberOfCards));
    if ((array.length - numberOfCards) <= movieArray.length) {
      setShowMoreButton(false);
    }
  }

  const goOut = () => {
    setIsSearchiFail(false);
  }

  useEffect(() => {
    checkArrayLength();
  }, [savedMovies, filteredSavedArray, numberOfCards]);

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
      <div className="saved-movies">
        {
          isSearchFail ? <span className="movie__search-fail">{searchMassages}</span> : (
            <MovieCardList
              moviesArray={movieArray}
              removeMovie={removeMovie}
              width={width}
              isSavedArray={isSavedArray}
            />
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
      </div>
    </>
  );
}

export default SavedMovies;
