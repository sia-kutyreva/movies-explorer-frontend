import React, { useState }from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  isMobileMenuOpen,
  onClick,
}) {
  const [movie, setMovie] = useState('');
  

  function handleChangeFilm(evt) {
    setMovie(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onClick({ movie });
    resetForm();
  }

  function resetForm() {
    setMovie('');
  }

  return (
    <section className="search-form page__search-form_path_movie">
      <form className="search-form__form" onSubmit={handleSubmit} id="search-form" autoComplete="on" name="search-form">
        <img className="search-form__img" src={searchIcon} alt="иконка поиска" />
        <input className="search-form__input" placeholder="Фильм" onChange={handleChangeFilm} value={movie} type="text" required />
        <Button 
          buttonClassName="button_search-form" 
          buttonText="Найти"
          onClick={handleSubmit} 
          type="submit"
        />
      </form>
      <FilterCheckbox 
        isMobileMenuOpen={isMobileMenuOpen}
      />
    </section>
  );
}

export default SearchForm;
