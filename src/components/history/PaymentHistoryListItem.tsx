import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import React, { Fragment, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import { MOTION } from '@/constants/MotionConstants';
import { IPaymentHistory } from '@/types/payment';
import { getPaymentHistoryStatus } from '@/utils/util';

interface IPaymentHistoryListItemProps {
  history: IPaymentHistory;
  onRefund: () => void;
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

const CostText = tw.span`
  text-[14px]
  font-bold
  leading-[22px]
  text-gray1
`;

const Title = tw.span`
  text-[18px]
  font-bold
  tracking-[-0.54px]
  text-gray1
`;

const OpenWrapper = tw(motion.div)`
  bg-[#F2F3F8]
  px-[50px]
  py-4
  flex
  flex-col
  gap-2
`;

const BubbleIcon = tw.img`
  h-[22px]
  w-[22px]
`;

const Tag = tw.div<{ $style?: 'default' | 'disabled' }>`
  ml-auto
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
  text-main-blue
  ${({ $style }) => $style === 'disabled' && 'text-unactivated'}
`;
const MachineNoText = tw.span`
  text-[12px]
  text-gray2
`;

const ChevronIcon = tw(FiChevronDown)<{ $open: boolean }>`
  w-[18px]
  h-[18px]
  text-gray2
  ${({ $open }) => $open && 'rotate-180'}
`;
//#endregion
const PaymentHistoryListItem = ({
  history,
  onRefund,
}: IPaymentHistoryListItemProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((current) => !current);
  };

  return (
    <Fragment>
      <Wrapper onClick={toggleOpen}>
        <Content>
          <div>
            <DateText>{dayjs(history.createdDate).format('YY.MM.DD')}</DateText>
            <TimeText>{dayjs(history.createdDate).format('HH:mm')}</TimeText>
          </div>
        </Content>
        <Content>
          <RowBlock>
            {history.type === 'CHARGE' && (
              <BubbleIcon src="/svg/bubble.svg" alt="next" />
            )}
            {history.type === 'LOST' && (
              <BubbleIcon src="/svg/lost_cup.svg" alt="next" />
            )}
            <Title>{getPaymentHistoryStatus(history.type)}</Title>
          </RowBlock>
          <RowBlock>
            <CostText>{history.price?.toLocaleString()}원</CostText>
            <ChevronIcon $open={open} />
          </RowBlock>
        </Content>
      </Wrapper>
      {open && (
        <OpenWrapper {...MOTION.FADE}>
          <Content>
            <MachineNoText>결제 수단</MachineNoText>
            <MachineNoText>
              {history.paymentMethod?.card?.acquirer}(
              {history.paymentMethod?.card?.number})
            </MachineNoText>
          </Content>
          {history.type !== 'LOST' && (
            <Fragment>
              <Content>
                <MachineNoText>충전 개수</MachineNoText>
                <MachineNoText>{history.amount}개</MachineNoText>
              </Content>
              <Content>
                <MachineNoText>잔여 개수</MachineNoText>
                <MachineNoText>{history.remainingAmount}개</MachineNoText>
              </Content>
              {history.amount === history.remainingAmount && (
                <Content>
                  {history.refunded ? (
                    <Tag $style="disabled">환불완료</Tag>
                  ) : (
                    <Tag $style="default" onClick={onRefund}>
                      환불하기
                    </Tag>
                  )}
                </Content>
              )}
            </Fragment>
          )}
        </OpenWrapper>
      )}
    </Fragment>
  );
};

export default PaymentHistoryListItem;
