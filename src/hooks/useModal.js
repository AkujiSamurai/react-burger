import { useCallback, useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsOpenModal] = useState(false);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  });

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  });

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
