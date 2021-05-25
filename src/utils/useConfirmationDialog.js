import React, { useState, useCallback } from 'react';
import ConfirmationDialog from '../components/ConfirmationDialog/ConfirmationDialog';

export function useConfirmationDialog({
  bodyText,
  buttonText,
}) {
  
  const [isOpen, setIsOpen] = useState(false);
 
    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
      setIsOpen(false);
    };

    const closePopupOverlay = (evt) => {
      evt.target.classList.contains('confirm_type_opend') && onClose()
    };

    const closePopupEscape = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
 
    const Dialog = useCallback(
        () => (
            <ConfirmationDialog
                bodyText={bodyText}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closePopupOverlay={closePopupOverlay}
                onClose={onClose}
                closePopupEscape={closePopupEscape}
                buttonText={buttonText}
            />
        ),
        [isOpen]
    );
 
    return {
        Dialog,
        onOpen,
    };

}
