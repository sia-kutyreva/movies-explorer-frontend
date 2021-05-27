import React from 'react';
import './Button.css';

function Button({
  buttonClassName,
  onClick,
  type,
  buttonText,
  isDisabled = false,
  }) 
  {
    return (
      <button className={`button ${buttonClassName} ${isDisabled ? 'button_type_disabled' : ''}`} onClick={onClick} type={type} disabled={isDisabled}>{buttonText}</button>
    );
}

export default Button;
