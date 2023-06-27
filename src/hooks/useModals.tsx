import { useContext } from 'react';
import { FloatingContext } from '@/context/FloatingContext';

const useModals = () => {
  const { openModal, closeModal } = useContext(FloatingContext);

  return { openModal, closeModal };
};

export default useModals;
