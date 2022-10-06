
import { useEffect } from "react";
import { createPortal } from "react-dom";
import propTypes from "prop-types";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

const Modal = ({children, onClose}) => {
  
  useEffect(() => {
   document.addEventListener("keydown", closeModal); 
    
    return () => { document.removeEventListener("keydown", closeModal); };
  }
  )
  
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === "Escape") {
      onClose();
    }  
  }
  return createPortal(
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal}>
          <span className={styles.close} onClick={closeModal}>X</span>
          {children}
        </div>
      </div>,
      modalRoot
    )
}
Modal.propTypes = {
  children: propTypes.node.isRequired,
  onClose: propTypes.func
}
export default Modal;
