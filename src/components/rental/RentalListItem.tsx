import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import { MOTION } from '@/constants/MotionConstants';
import { IRental, RentalStatus } from '@/types/rental';
import { getRentalStatus } from '@/utils/util';

interface IRentalListItemProps {
  rental: IRental;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  h-[92px]
  w-full
  flex-col
  justify-between
  px-5
  py-[18px]
`;

const Content = tw.div`
  flex
  w-full
  flex-row
  items-center
  justify-between
`;

const DateText = tw.span`
  text-[14px]
  font-medium
  text-gray1
`;

const RowBlock = tw.div`
  flex
  flex-row
  items-center
  gap-2
`;

const TimeText = tw.span`
  ml-[6px]
  text-[12px]
  text-gray2
`;

const CostBlock = tw.div`
  flex
  flex-row
  items-center
  gap-1
`;

const CostText = tw.span`
  text-[16px]
  font-bold
text-main-blue
`;

const Title = tw.span`
  text-[18px]
  font-bold
  tracking-[-0.54px]
  text-gray1
`;

const OpenWrapper = tw(motion.div)`
  bg-[#F2F3F8]
  px-7
  py-4
  flex
  flex-col
  gap-2
`;

const BubbleIcon = tw.img`
  h-[22px]
  w-[22px]
`;

const Tag = tw.div<{ $status: RentalStatus }>`
  flex
  h-[22px]
  w-[60px]
  items-center
  justify-center
  rounded-full
  border-[1px]
  border-solid
  text-[12px]
  font-medium
  ${({ $status }) => {
    switch ($status) {
      case 'PROCEEDING':
        return 'bg-white text-main-blue';
      case 'SUCCEEDED':
        return 'bg-main-blue border-main-blue text-white';
      case 'FAILED':
        return 'bg-white text-point-yellow';
      default:
        return 'bg-main-blue';
    }
  }}
`;

const MachineNoBlock = tw.div`
  flex
  flex-row
  items-center
  gap-[5px]
`;

const Disc = tw.div`
  h-[6px]
  w-[6px]
  rounded-full
  bg-main-blue
`;

const MachineNoText = tw.span`
  text-[12px]
  text-gray2
`;

const RentalNoText = tw.span`
  ml-auto
  text-[12px]
  text-unactivated
`;

const DateTimeText = tw.span`
  text-[12px]
  text-[#4E4C4A]
`;

const ChevronIcon = tw(FiChevronDown)<{ $open: boolean }>`
  w-[18px]
  h-[18px]
  text-gray2
  ${({ $open }) => $open && 'rotate-180'}
`;
//#endregion
const RentalListItem = ({ rental }: IRentalListItemProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((current) => !current);
  };

  return (
    <Fragment>
      <Wrapper onClick={toggleOpen}>
        <Content>
          <div>
            <DateText>{dayjs(rental.createdDate).format('YY.MM.DD')}</DateText>
            <TimeText>{dayjs(rental.createdDate).format('HH:mm')}</TimeText>
          </div>
        </Content>
        <Content>
          <RowBlock>
            <Title>{rental.withIce ? '얼음컵 대여' : '컵만 대여'}</Title>
            <CostBlock>
              <BubbleIcon src="/svg/bubble.svg" alt="next" />
              <CostText>{rental.cost}</CostText>
            </CostBlock>
          </RowBlock>
          <RowBlock>
            <Tag $status={rental.status}>{getRentalStatus(rental.status)}</Tag>
            <ChevronIcon $open={open} />
          </RowBlock>
        </Content>
      </Wrapper>
      <AnimatePresence>
        {open && (
          <OpenWrapper {...MOTION.DROPDOWN}>
            <Content>
              <MachineNoBlock>
                <Disc />
                <MachineNoText>
                  자판기번호 {rental.fromMachine.no}
                </MachineNoText>
              </MachineNoBlock>
            </Content>
            {rental.status === 'PROCEEDING' && (
              <Content>
                <MachineNoBlock>
                  <Disc />
                  <MachineNoText>반납기한</MachineNoText>
                </MachineNoBlock>
                <DateTimeText>
                  {rental.expiredDate &&
                    dayjs(rental.expiredDate).format('YYYY.MM.DD HH:mm')}
                </DateTimeText>
              </Content>
            )}
            {rental.status === 'SUCCEEDED' && (
              <Content>
                <MachineNoBlock>
                  <Disc />
                  <MachineNoText>
                    수거함번호 {rental.toMachine?.no}
                  </MachineNoText>
                </MachineNoBlock>
                <DateTimeText>
                  {rental.succeededDate &&
                    dayjs(rental.succeededDate).format('YYYY.MM.DD HH:mm')}
                </DateTimeText>
              </Content>
            )}
            {rental.status === 'FAILED' && (
              <Content>
                <MachineNoBlock>
                  <Disc />
                  <MachineNoText>분실</MachineNoText>
                </MachineNoBlock>
                <DateTimeText>
                  {rental.expiredDate &&
                    dayjs(rental.expiredDate).format('YYYY.MM.DD HH:mm')}
                </DateTimeText>
              </Content>
            )}
            <Content>
              <RentalNoText>no.{rental.id}</RentalNoText>
            </Content>
          </OpenWrapper>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default RentalListItem;
