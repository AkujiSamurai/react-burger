import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

export const Modal = ({ children, onClose }) => {
  const modalRoot = document.getElementById('modal');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <button className={`${styles.close_button}`} onClick={onClose}>
          <CloseIcon />
        </button>

        <div>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
