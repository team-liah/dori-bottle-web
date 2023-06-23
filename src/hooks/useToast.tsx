import { useContext } from 'react';
import { FloatingContext } from '@/context/FloatingContext';

const useToast = () => {
  const { openToast } = useContext(FloatingContext);

  return { openToast };
};

export default useToast;
