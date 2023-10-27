import React, { useContext } from 'react';
import { useModal } from '../../Contexts/Modal'
import { AppContext } from '../../Contexts/AppContext'

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className // optional: className to be applied to the button that opens the modal
}) {
  const { setModalContent, setOnModalClose } = useModal();
  
  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button className={className} onClick={onClick}>
      <span>{buttonText}</span>
    </button>
  );
}

export default OpenModalButton;
