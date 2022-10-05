//import { useEffect } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom"
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
}
export default Modal;
// export default class Modal extends Component {

// componentDidMount() {
//     document.addEventListener("keydown", this.closeModal);
// }

// componentWillUnmount() {
//     document.removeEventListener("keydown", this.closeModal)
// }

// closeModal = ({target, currentTarget, code}) => {
//     if (target === currentTarget || code === "Escape") {
//       this.props.onClose();
//     }
// }

// render() {
//     const { closeModal } = this;
//     const { children } = this.props;
//     return createPortal(
//       <div className={styles.overlay} onClick={closeModal}>
//         <div className={styles.modal}>
//             <span className={styles.close} onClick={closeModal}>X</span>
//             {children}
//         </div>
//       </div>,
//       modalRoot
//     )
//   }
// }