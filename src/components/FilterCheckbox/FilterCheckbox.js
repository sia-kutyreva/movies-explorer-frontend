import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({
  isMobileMenuOpen
}) 
{
  const filterDisabled = isMobileMenuOpen ? "filter_disabled" : "";

  return (
    <label className={`filter ${filterDisabled}`}>
      <input type="checkbox" name="checkbox" className="filter__input-invisible" />
      <span className="filter__input-visible"></span>Короткометражки
    </label>
  );
}

export default FilterCheckbox;
