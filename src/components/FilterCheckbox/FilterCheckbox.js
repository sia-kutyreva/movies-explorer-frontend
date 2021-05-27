import React, { useEffect, useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({
  isMobileMenuOpen,
  handleToggleShort
}) 
{
  const filterDisabled = isMobileMenuOpen ? "filter_disabled" : "";
  const [isShortMoviesSelected, setIsShortMoviesSelected] = useState(false);

  const toggleFilter = () => {
    setIsShortMoviesSelected(!isShortMoviesSelected);
  }

  useEffect(()=> {
    handleToggleShort(isShortMoviesSelected);
  }, [isShortMoviesSelected])

  return (
    <label className={`filter ${filterDisabled}`}>
      <input type="checkbox" name="checkbox" className="filter__input-invisible" onClick={toggleFilter} />
      <span className="filter__input-visible"></span>Короткометражки
    </label>
  );
}

export default FilterCheckbox;
