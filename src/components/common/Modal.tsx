import { motion } from 'framer-motion';
import React, { Fragment } from 'react';
import { useContext } from 'react';
import tw from 'tailwind-styled-components';
import Portal from './Portal';
import { ModalContext } from '@/context/ModalContext';

//#region Styled Component

const Dimmed = tw.div`
  fixed
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
  const { openedModals, closeModal } = useContext(ModalContext);

  return (
    <Portal>
      {openedModals.map((modal, index) => {
        const { component: Component, props } = modal;

        return (
          <Fragment key={index}>
            <Dimmed onClick={() => closeModal(Component)} />
            <ModalContainer
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Component {...props} />
            </ModalContainer>
          </Fragment>
        );
      })}
    </Portal>
  );
};

export default Modal;
