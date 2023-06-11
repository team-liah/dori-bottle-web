import React, { createContext, useCallback, useState } from 'react';

interface ModalContextType {
  openedModals: React.ReactNode[];
  openModal: (Component: React.ReactNode) => void;
  closeModal: (Component: React.ReactNode) => void;
}

interface ModalContextProps {
  children: React.ReactNode;
}

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);

export const ModalProvider = (props: ModalContextProps) => {
  const [openedModals, setOpenedModals] = useState<React.ReactNode[]>([]);

  const openModal = (Component: React.ReactNode) => {
    setOpenedModals((modals) => {
      return [...modals, Component];
    });
  };

  const closeModal = (Component: React.ReactNode) => {
    setOpenedModals((modals) => {
      return modals.filter((modal) => modal !== Component);
    });
  };

  return <ModalContext.Provider value={{ openedModals, openModal, closeModal }}>{props.children}</ModalContext.Provider>;
};
