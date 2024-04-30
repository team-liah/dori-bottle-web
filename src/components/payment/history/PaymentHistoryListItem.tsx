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
  onInquiry: () => void;
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

const Tag = tw.div<{ $style?: 'default' | 'yellow' | 'disabled' }>`
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
  ${({ $style }) => $style === 'yellow' && 'text-point-yellow'}
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
  onInquiry,
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
            {history.type === 'SAVE_POINT' && (
              <BubbleIcon src="/svg/bubble.svg" alt="next" />
            )}
            {history.type === 'LOST_CUP' && (
              <BubbleIcon src="/svg/lost_cup.svg" alt="next" />
            )}
            {history.type === 'UNBLOCK_ACCOUNT' && (
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
              {history.card?.acquirer}({history.card?.number})
            </MachineNoText>
          </Content>
          {history.type === 'SAVE_POINT' && (
            <Fragment>
              <Content>
                <MachineNoText>충전 개수</MachineNoText>
                <MachineNoText>{history.savePointAmounts}개</MachineNoText>
              </Content>
              <Content>
                <MachineNoText>잔여 개수</MachineNoText>
                <MachineNoText>{history.remainPointAmounts}개</MachineNoText>
              </Content>
              <Content>
                {history.status === 'CANCELED' && (
                  <Tag $style="disabled">환불완료</Tag>
                )}
                {history.savePointAmounts === history.remainPointAmounts && (
                  <Tag $style="default" onClick={onRefund}>
                    환불하기
                  </Tag>
                )}
              </Content>
            </Fragment>
          )}
          {history.type === 'LOST_CUP' && (
            <Fragment>
              <Content>
                {history.status === 'CANCELED' && (
                  <Tag $style="disabled">환불완료</Tag>
                )}
                {dayjs(history.createdDate).isAfter(
                  dayjs().subtract(7, 'day'),
                ) && (
                  <Tag $style="yellow" onClick={onInquiry}>
                    환불접수
                  </Tag>
                )}
              </Content>
            </Fragment>
          )}
        </OpenWrapper>
      )}
    </Fragment>
  );
};

export default PaymentHistoryListItem;
