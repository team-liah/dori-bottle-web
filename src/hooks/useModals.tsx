import { ModalContext } from '@/context/ModalContext';
import { useContext } from 'react';

const useModals = () => {
  const { openModal, closeModal } = useContext(ModalContext);

  return { openModal, closeModal };
};

export default useModals;
