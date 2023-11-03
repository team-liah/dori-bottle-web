import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import React, { Fragment, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import { MOTION } from '@/constants/MotionConstants';
import { INotice } from '@/types/notice';

interface INoticeListItemProps {
  notice: INotice;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  h-[92px]
  w-full
  flex-row
  items-center
  justify-between
  px-5
  py-[18px]
`;

const Content = tw.div`
  flex
  w-full
  flex-col
  justify-between
  gap-1
`;

const DateText = tw.span`
  text-[12px]
  font-medium
  text-unactivated
`;

const Title = tw.span`
  text-[16px]
  font-medium
  leading-[22px]
  tracking-[-0.48px]
  text-gray1
`;

const OpenWrapper = tw(motion.div)`
  px-7
  py-4
  flex
  flex-col
  gap-2
`;

const ChevronIcon = tw(FiChevronDown)<{ $open: boolean }>`
  w-[24px]
  h-[24px]
  text-gray1
  ${({ $open }) => $open && 'rotate-180'}
`;

//#endregion
const NoticeListItem = ({ notice }: INoticeListItemProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((current) => !current);
  };

  return (
    <Fragment>
      <Wrapper onClick={toggleOpen}>
        <Content>
          <Title>{notice.title}</Title>
          <DateText>{dayjs(notice.createdDate).format('YYYY.MM.DD')}</DateText>
        </Content>
        <ChevronIcon $open={open} />
      </Wrapper>
      {open && (
        <OpenWrapper {...MOTION.FADE}>
          <Content
            className="view ql-editor"
            dangerouslySetInnerHTML={{ __html: notice.content }}
          ></Content>
        </OpenWrapper>
      )}
    </Fragment>
  );
};

export default NoticeListItem;
