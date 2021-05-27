import React from 'react';
import './LoadingPopup.css';
import Preloader from '../Preloader/Preloader';

function LoadingPopup({
  isLoading
}) {
  return (
    <div className={`loading ${isLoading ? 'loading_type_active' : ''}`}>
      <Preloader />
    </div>
  );
}

export default LoadingPopup;
