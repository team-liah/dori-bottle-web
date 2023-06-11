import React, { Fragment } from 'react';
import Portal from './Portal';
import tw from 'tailwind-styled-components';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ModalContext } from '@/context/ModalContext';

//#region Styled Component

const Dimmed = tw.div<{ $open: boolean }>`
  fixed w-screen h-screen left-0 top-0 bg-black bg-opacity-60 ${(props) => (props.$open ? '' : 'hidden')}`;

const ModalContainer = tw(motion.div)`
  w-full absolute bottom-0 bg-white rounded-t-[25px] overflow-hidden pt-10 pb-8`;

//#endregion

const Modal = () => {
  const { openedModals, closeModal } = useContext(ModalContext);
  return (
    <Portal>
      {openedModals.map((modal, index) => {
        return (
          <Fragment key={modal?.toLocaleString()}>
            <Dimmed $open={true} onClick={() => closeModal(modal)} />
            <ModalContainer initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }}>
              {modal}
            </ModalContainer>
          </Fragment>
        );
      })}
    </Portal>
  );
};

export default Modal;
