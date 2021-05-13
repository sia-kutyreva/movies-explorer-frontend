import React from 'react';
import './Button.css';

function Button({
  buttonClassName,
  onClick,
  type,
  buttonText
  }) 
  {
    return (
      <button className={`button ${buttonClassName}`} onClick={onClick} type={type}>{buttonText}</button>
    );
}

export default Button;
