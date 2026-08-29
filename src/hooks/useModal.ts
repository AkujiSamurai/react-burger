import { useCallback, useState } from 'react';

type UseModalReturn = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModal = (): UseModalReturn => {
  const [isModalOpen, setIsOpenModal] = useState(false);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
