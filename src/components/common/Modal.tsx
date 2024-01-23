import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { useContext } from 'react';
import tw from 'tailwind-styled-components';
import { Dimmed } from './CustomStyledComponent';
import Portal from './Portal';
import { MOTION } from '@/constants/MotionConstants';
import {
  FloatingComponentType,
  FloatingContext,
} from '@/context/FloatingContext';

//#region Styled Component

const ModalWrapper = tw.div`
  fixed
  left-0
  top-0
  z-[2000]
  flex
  h-screen
  w-screen
  items-center
  justify-center
  overflow-hidden
`;

const ModalContainer = tw(motion.div)`
  absolute
  w-fit
  overflow-hidden
  rounded-[20px]
`;

const BottomSheetContainer = tw(motion.div)<{ $fullScreen?: boolean }>`
  w-full
  absolute
  bottom-0
  overflow-hidden
  bg-white
  rounded-t-[25px]
  ${(props) => !props.$fullScreen && 'pt-[10px] pb-[30px]'}
`;

const BottomSheetHandle = tw.div`
  mx-auto
  min-h-[5px]
  w-[25vw]
  transform
  rounded-full
  bg-gray2
`;

const BottomSheetCloseButton = tw(X)`
  absolute
  top-5
  right-5
  z-[1000]
  p-[10px]
  w-[40px]
  h-[40px]
  bg-white
  rounded-full
  shadow-[0_0_8px_0px_rgba(17,17,17,0.12)]
`;

//#endregion

const Modal = () => {
  const { openedModals, closeModal } = useContext(FloatingContext);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleClose = (modal: FloatingComponentType) => {
    closeModal(modal.component);
    modal.props?.onClose && modal.props.onClose();
  };

  const handleTouchMove = (modal: FloatingComponentType) => {
    if (modal.fullScreen) return;
    if (touchStart - touchEnd < -75) {
      handleClose(modal);
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {openedModals.map((modal, index) => {
          const { component: Component, props, position, fullScreen } = modal;

          return (
            <ModalWrapper
              key={index}
              onTouchStart={(e) => {
                setTouchEnd(0);
                setTouchStart(e.targetTouches[0].clientY);
              }}
              onTouchMove={(e) => setTouchEnd(e.changedTouches[0].clientY)}
              onTouchEnd={() => handleTouchMove(modal)}
            >
              <Dimmed onClick={() => handleClose(modal)} />
              {position === 'bottom' ? (
                <BottomSheetContainer $fullScreen={fullScreen} {...MOTION.POP}>
                  {fullScreen ? (
                    <BottomSheetCloseButton
                      onClick={() => handleClose(modal)}
                    />
                  ) : (
                    <BottomSheetHandle />
                  )}
                  <Component {...props} />
                </BottomSheetContainer>
              ) : (
                <ModalContainer {...MOTION.POP}>
                  <Component {...props} />
                </ModalContainer>
              )}
            </ModalWrapper>
          );
        })}
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
