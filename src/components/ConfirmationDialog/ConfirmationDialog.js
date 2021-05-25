import React from 'react';
import './ConfirmationDialog.css';

function ConfirmationDialog({
  bodyText,
  buttonText,
  isOpen,
  closePopupOverlay,
  onClose,
  closePopupEscape,
}) {

  function handleEsc(evt) {
    closePopupEscape(evt)
  }

  function handleOverlay(evt) {
    closePopupOverlay(evt)
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    }
  })

  return (
    <div className={`confirm ${isOpen ? 'confirm_type_opend' : ''}`} onMouseDown={handleOverlay}>
      <div className="confirm__grid">
        <p className="confirm__text">{bodyText}</p>
        <button className="confirm__button" onClick={onClose}>{buttonText}</button>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
