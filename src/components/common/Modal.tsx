import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useContext } from 'react';
import tw from 'tailwind-styled-components';
import Portal from './Portal';
import { FloatingContext } from '@/context/FloatingContext';

//#region Styled Component

const ModalWrapper = tw.div`
  fixed
  left-0
  top-0
  z-[2000]
  h-screen
  w-screen
  overflow-hidden
`;

const Dimmed = tw.div`
  absolute
  left-0
  top-0
  h-screen
  w-screen
  bg-black
  bg-opacity-60
`;

const ModalContainer = tw(motion.div)`
  w-full
  absolute
  bottom-0
  rounded-t-[25px]
  overflow-hidden
`;

//#endregion

const Modal = () => {
  const { openedModals, closeModal } = useContext(FloatingContext);

  return (
    <Portal>
      <AnimatePresence>
        {openedModals.map((modal, index) => {
          const { component: Component, props } = modal;

          return (
            <ModalWrapper key={index}>
              <Dimmed onClick={() => closeModal(Component)} />
              <ModalContainer
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '100%', transition: { duration: 0.1 } }}
              >
                <Component {...props} />
              </ModalContainer>
            </ModalWrapper>
          );
        })}
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
