import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import React, { Fragment, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import { MOTION } from '@/constants/MotionConstants';
import { IInquiry } from '@/types/inquiry';

interface IInquiryListItemProps {
  inquiry: IInquiry;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-row
  items-center
  justify-between
  pr-5
`;

const Content = tw.div`
  flex
  w-full
  flex-col
  justify-between
  gap-1
  p-5
`;

const Title = tw.span`
  text-ellipsis
  text-[16px]
  font-medium
  leading-[22px]
  text-gray1
`;

const DateText = tw.span`
  text-[12px]
  font-medium
  leading-[16px]
  text-unactivated
`;

const OpenWrapper = tw(motion.div)`
  flex
  flex-col
  bg-back-color
`;

const ContentText = tw.span`
  text-[14px]
  leading-[22px]
  text-gray1
`;

const ContentLabel = tw(ContentText)`
  font-medium
`;

const ChevronIcon = tw(FiChevronDown)<{ $open: boolean }>`
  w-[24px]
  h-[24px]
  text-gray1
  ${({ $open }) => $open && 'rotate-180'}
`;

//#endregion
const InquiryListItem = ({ inquiry }: IInquiryListItemProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((current) => !current);
  };

  return (
    <Fragment>
      <Wrapper onClick={toggleOpen}>
        <Content>
          <Title>{inquiry.content}</Title>
          <DateText>{dayjs(inquiry.createdDate).format('YYYY.MM.DD')}</DateText>
        </Content>
        <ChevronIcon $open={open} />
      </Wrapper>
      {open && (
        <OpenWrapper {...MOTION.FADE}>
          <Content>
            <ContentLabel>[문의내용]</ContentLabel>
            <ContentText>{inquiry.content}</ContentText>
          </Content>
          <Content>
            <ContentLabel>[답변]</ContentLabel>
            <ContentText>{inquiry.answer}</ContentText>
          </Content>
        </OpenWrapper>
      )}
    </Fragment>
  );
};

export default InquiryListItem;
