import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import { MOTION } from '@/constants/MotionConstants';

interface IToolTipProps {
  children: React.ReactNode;
  toolTip: React.ReactNode;
}

//#region Styled Components

const Wrapper = tw.div`
  relative
`;

const ToolTipWrapper = tw(motion.div)`
  absolute
  top-1/2
  right-[-8px]
  max-w-[180px]
  translate-x-full
  translate-y-[-50%]
  rounded-[10px]
  bg-[#5F5F5F]
  bg-opacity-[0.85]
  px-3
  py-[10px]
`;

const ToolTipText = tw.div`
  whitespace-pre
  text-[12px]
  font-light
  leading-normal
  tracking-[-0.36px]
  text-white
`;

const Dimmed = tw.div`
  fixed
  inset-0
  h-screen
  w-screen
`;

//#endregion

const ToolTip = ({ children, toolTip }: IToolTipProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper onClick={() => setOpen((prev) => !prev)}>
      {children}
      <AnimatePresence>
        {open && (
          <>
            <Dimmed
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            />
            <ToolTipWrapper
              {...MOTION.FADE}
              transition={{
                duration: 0.2,
              }}
            >
              <ToolTipText>{toolTip}</ToolTipText>
            </ToolTipWrapper>
          </>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default ToolTip;
