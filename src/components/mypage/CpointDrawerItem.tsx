import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import { MOTION } from '@/constants/MotionConstants';

interface ICpointDrawerItemProps {
  title: string;
  content: React.ReactNode;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-row
  justify-between
  border-b
  border-back-line
  px-5
  py-[18px]
`;

const Title = tw.span`
  text-[16px]
  font-medium
  text-gray1
`;

const OpenWrapper = tw(motion.div)`
  flex
  flex-col
  w-full
  items-center
  border-b
  border-back-line
`;

const ChevronIcon = tw(FiChevronDown)<{ $open: boolean }>`
  w-[18px]
  h-[18px]
  text-gray2
  ${({ $open }) => $open && 'rotate-180'}
`;

//#endregion

const CpointDrawerItem = ({ title, content }: ICpointDrawerItemProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((current) => !current);
  };

  return (
    <div>
      <Wrapper onClick={toggleOpen}>
        <Title>{title}</Title>
        <ChevronIcon $open={open} />
      </Wrapper>
      {open && <OpenWrapper {...MOTION.FADE}>{content}</OpenWrapper>}
    </div>
  );
};

export default CpointDrawerItem;
