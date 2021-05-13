import React from 'react';
import './NotFoundPage.css';
import Button from '../Button/Button';

function NotFoundPage({
  onClick
}) 
{
  return (
    <main className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <Button 
        buttonClassName="button_not-found" 
        buttonText="Назад"
        onClick={onClick} 
      />
    </main>
  );
}

export default NotFoundPage;
