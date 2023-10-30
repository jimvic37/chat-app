import React, { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import ReactDOM from "react-dom";
import './Modal.css'

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(AppContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}
