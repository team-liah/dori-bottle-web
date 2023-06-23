import React, { createContext, useCallback, useState } from 'react';

interface FloatingComponentType {
  component: React.FC<any>;
  props?: any;
}

interface FloatingContextType {
  openedModals: FloatingComponentType[];
  openModal: (modalComponent: FloatingComponentType) => void;
  closeModal: (component: React.FC<any>) => void;
  openedToast?: FloatingComponentType;
  openToast: (modalComponent: FloatingComponentType) => void;
  closeToast: () => void;
}

interface FloatingContextProps {
  children: React.ReactNode;
}

export const FloatingContext = createContext<FloatingContextType>(
  {} as FloatingContextType,
);

const FloatingProvider: React.FC<FloatingContextProps> = ({ children }) => {
  const [openedModals, setOpenedModals] = useState<FloatingComponentType[]>([]);
  const [openedToast, setOpenedToasts] = useState<FloatingComponentType>();

  const openModal = useCallback(
    ({ component, props }: FloatingComponentType) => {
      setOpenedModals((modals) => {
        return [...modals, { component, props }];
      });
    },
    [],
  );

  const closeModal = useCallback((component: React.FC<any>) => {
    setOpenedModals((modals) => {
      return modals.filter((modal) => modal.component !== component);
    });
  }, []);

  const openToast = useCallback(
    ({ component, props }: FloatingComponentType) => {
      setOpenedToasts({ component, props });
    },
    [],
  );

  const closeToast = useCallback(() => {
    setOpenedToasts(undefined);
  }, []);

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
