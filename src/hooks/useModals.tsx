import { useContext } from 'react';
import { ModalContext } from '@/context/ModalContext';

const useModals = () => {
  const { openModal, closeModal } = useContext(ModalContext);

  return { openModal, closeModal };
};

export default useModals;
