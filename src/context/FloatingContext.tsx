import { useRouter } from 'next/router';
import React, { createContext, useCallback, useEffect, useState } from 'react';

interface FloatingComponentType {
  component: React.FC<any>;
  position?: 'center' | 'bottom';
  draggable?: boolean;
  props?: any;
}

interface ToastType {
  component: React.ReactNode;
}
interface FloatingContextType {
  openedModals: FloatingComponentType[];
  openModal: (modalComponent: FloatingComponentType) => void;
  closeModal: (component: React.FC<any>) => void;
  openedToast?: ToastType;
  openToast: (modalComponent: ToastType) => void;
  closeToast: () => void;
}

interface FloatingContextProps {
  children: React.ReactNode;
}

export const FloatingContext = createContext<FloatingContextType>(
  {} as FloatingContextType,
);

const FloatingProvider: React.FC<FloatingContextProps> = ({ children }) => {
  const router = useRouter();
  const [openedModals, setOpenedModals] = useState<FloatingComponentType[]>([]);
  const [openedToast, setOpenedToasts] = useState<ToastType>();

  const openModal = useCallback((props: FloatingComponentType) => {
    setOpenedModals((modals) => {
      return [...modals, { ...props }];
    });
  }, []);

  const closeModal = useCallback((component: React.FC<any>) => {
    setOpenedModals((modals) => {
      return modals.filter((modal) => modal.component !== component);
    });
  }, []);

  const openToast = useCallback(({ component }: ToastType) => {
    setOpenedToasts({ component });
  }, []);

  const closeToast = useCallback(() => {
    setOpenedToasts(undefined);
  }, []);

  useEffect(() => {
    setOpenedModals([]);
  }, [router.pathname]);

  return (
    <FloatingContext.Provider
      value={{
        openedModals,
        openModal,
        closeModal,
        openedToast,
        openToast,
        closeToast,
      }}
    >
      {children}
    </FloatingContext.Provider>
  );
};

export default FloatingProvider;
