import React from 'react';
import { Link } from 'react-router-dom'
import './PageWithForm.css';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';

function PageWithForm({
  name,
  title,
  buttonText,
  buttonType,
  buttonClassName,
  onSubmit,
  children,
  link,
  text,
  authText,
  authLink,
  path
}) 
{
//<h2 className={`form-page__${text}`}>Уже зарегистрированы? <Link to="/" className={`form-page__${link}`}>Войти</Link></h2>
  return (
    <main className={`form-page form-page_${name}`}>
      <Logo />
      <h1 className="form-page__title">{title}</h1>
      <form className="form-page__form" onSubmit={onSubmit} id={`popup-form-${name}`} autoComplete="on" name={`popup-form-${name}`}>
          {children}
        <Button 
          buttonClassName={buttonClassName}
          type={buttonType}
          buttonText={buttonText}
        />
      </form>
      <h2 className={`form-page__${text}`}>{authText}<Link to={path} className={`form-page__${link}`}>{authLink}</Link></h2>
    </main>
  );
}

export default PageWithForm;