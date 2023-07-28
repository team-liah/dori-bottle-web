import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useContext } from 'react';
import tw from 'tailwind-styled-components';
import { Dimmed } from './CustomStyledComponent';
import Portal from './Portal';
import { MOTION } from '@/constants/MotionConstants';
import { FloatingContext } from '@/context/FloatingContext';

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

const BottomSheetContainer = tw(motion.div)`
  w-full
  absolute
  bottom-0
  rounded-t-[25px]
  overflow-hidden
  bg-white
  pt-[10px]
  pb-[30px]
`;

const BottomSheetSlidebar = tw.div`
  absolute
  top-[10px]
  left-[50%]
  h-[4px]
  w-[10vw]
  -translate-x-1/2
  transform
  rounded-full
  bg-gray2
`;

//#endregion

const Modal = () => {
  const { openedModals, closeModal } = useContext(FloatingContext);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchMove = (component: React.FC<any>) => {
    if (touchStart - touchEnd < -75) {
      closeModal(component);
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        {openedModals.map((modal, index) => {
          const { component: Component, props } = modal;

          return (
            <ModalWrapper key={index}>
              <Dimmed onClick={() => closeModal(Component)} />
              {modal.position === 'bottom' ? (
                <BottomSheetContainer
                  {...MOTION.POP}
                  onTouchStart={(e) =>
                    setTouchStart(e.targetTouches[0].clientY)
                  }
                  onTouchMove={(e) => setTouchEnd(e.changedTouches[0].clientY)}
                  onTouchEnd={() => handleTouchMove(Component)}
                >
                  <BottomSheetSlidebar />
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
