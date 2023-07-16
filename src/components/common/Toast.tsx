import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import tw from 'tailwind-styled-components';
import Portal from './Portal';
import { MOTION } from '@/constants/MotionConstants';
import { FloatingContext } from '@/context/FloatingContext';

//#region Styled Component

const ToastWrapper = tw.div`
  pointer-events-none
  fixed
  left-0
  top-0
  z-[5000]
  flex
  h-screen
  w-screen
  justify-center
  overflow-hidden
`;

const ToastContainer = tw(motion.div)`
  absolute
  bottom-[40px]
  bg-toast
  bg-opacity-70
  w-[320px]
  rounded-[15px]
  h-[48px]
  flex 
  items-center
  justify-center
`;

//#endregion

const Toast = () => {
  const { openedToast, closeToast } = useContext(FloatingContext);

  useEffect(() => {
    if (!openedToast) return;
    const timer = setTimeout(() => {
      closeToast();
    }, 1700);

    return () => clearTimeout(timer);
  }, [closeToast, openedToast]);

  return (
    <Portal>
      <AnimatePresence>
        {openedToast && (
          <ToastWrapper>
            <ToastContainer {...MOTION.FADE}>
              {openedToast.component}
            </ToastContainer>
          </ToastWrapper>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Toast;
