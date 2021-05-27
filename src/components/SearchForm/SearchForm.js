import React, { useEffect } from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  isMobileMenuOpen,
  values,
  handleChange,
  onSubmit,
  handleToggleShort,
  handleSearchFail
}) 
{

  useEffect(()=> {
    handleSearchFail(false);
  }, [values])

  return (
    <section className="search-form page__search-form_path_movie">
      <form className="search-form__form" onSubmit={onSubmit} id="search-form" autoComplete="on" name="search-form">
        <img className="search-form__img" src={searchIcon} alt="иконка поиска" />
        <input className="search-form__input"
          name='movie'
          placeholder="Фильм" 
          onChange={handleChange} 
          value={values.movie || ''} 
          type="text"
        />
        <Button 
          buttonClassName="button_search-form" 
          buttonText="Найти" 
          type="submit"
        />
      </form>
      <FilterCheckbox 
        isMobileMenuOpen={isMobileMenuOpen}
        handleToggleShort={handleToggleShort}
      />
    </section>
  );
}

export default SearchForm;
