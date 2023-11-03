import { motion } from 'framer-motion';
import React, { Fragment, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import { MOTION } from '@/constants/MotionConstants';
import { INotice } from '@/types/notice';

interface IFaqListItemProps {
  faq: INotice;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-row
  items-center
  justify-between
  p-5
`;

const Content = tw.div`
  flex
  w-full
  flex-col
  justify-between
  gap-1
`;

const Title = tw.span`
  text-[16px]
  font-medium
  leading-[22px]
  tracking-[-0.48px]
  text-gray1
`;

const OpenWrapper = tw(motion.div)`
  px-5
  py-[18px]
  flex
  flex-col
  gap-2
  bg-back-color
`;

const ChevronIcon = tw(FiChevronDown)<{ $open: boolean }>`
  w-[24px]
  h-[24px]
  text-gray1
  ${({ $open }) => $open && 'rotate-180'}
`;

//#endregion
const FaqListItem = ({ faq }: IFaqListItemProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((current) => !current);
  };

  return (
    <Fragment>
      <Wrapper onClick={toggleOpen}>
        <Content>
          <Title>{faq.title}</Title>
        </Content>
        <ChevronIcon $open={open} />
      </Wrapper>
      {open && (
        <OpenWrapper {...MOTION.FADE}>
          <Content
            className="view ql-editor"
            dangerouslySetInnerHTML={{ __html: faq.content }}
          ></Content>
        </OpenWrapper>
      )}
    </Fragment>
  );
};

export default FaqListItem;
