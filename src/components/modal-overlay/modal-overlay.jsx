import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose} />;
};
