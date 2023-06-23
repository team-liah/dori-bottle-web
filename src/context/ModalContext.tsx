import React, { createContext, useState } from 'react';

interface ModalComponentType {
  component: React.FC<any>;
  props?: any;
}

interface ModalContextType {
  openedModals: ModalComponentType[];
  openModal: (modalComponent: ModalComponentType) => void;
  closeModal: (component: React.FC<any>) => void;
}

interface ModalContextProps {
  children: React.ReactNode;
}

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);

const ModalProvider: React.FC<ModalContextProps> = ({ children }) => {
  const [openedModals, setOpenedModals] = useState<ModalComponentType[]>([]);

  const openModal = ({ component, props }: ModalComponentType) => {
    setOpenedModals((modals) => {
      return [...modals, { component, props }];
    });
  };

  const closeModal = (component: React.FC<any>) => {
    setOpenedModals((modals) => {
      return modals.filter((modal) => modal.component !== component);
    });
  };

  return (
    <ModalContext.Provider value={{ openedModals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
