import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import tw from 'tailwind-styled-components';
import { IBubbleHistory } from '@/types/point';
import { getBubbleHistoryStatus } from '@/utils/util';

interface IBubbleHistoryListItemProps {
  history: IBubbleHistory;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
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

const DateTimeWrapper = tw.div`
  flex
  flex-col
`;

const DateText = tw.span`
  text-[12px]
  font-medium
  text-gray1
`;

const RowBlock = tw.div`
  flex
  flex-row
  items-center
  gap-7
`;
const CostText = tw.span<{ $color?: 'yellow' | 'blue' }>`
  text-[14px]
  font-medium
  leading-[22px]
  text-gray1
  ${(p) => p.$color === 'yellow' && 'text-point-yellow'};
  ${(p) => p.$color === 'blue' && 'text-main-blue'};
`;

const Title = tw.span`
  text-[14px]
  font-bold
  text-gray1
`;
//#endregion
const BubbleHistoryListItem = ({ history }: IBubbleHistoryListItemProps) => {
  return (
    <Fragment>
      <Wrapper>
        <Content>
          <RowBlock>
            <DateTimeWrapper>
              <DateText>
                {dayjs(history.createdDate).format('YY.MM.DD')}
              </DateText>
              <DateText>{dayjs(history.createdDate).format('HH:mm')}</DateText>
            </DateTimeWrapper>
            <Title>{getBubbleHistoryStatus(history.eventType)}</Title>
          </RowBlock>
          <CostText
            $color={
              history.eventType.includes('REWARD')
                ? 'yellow'
                : history.eventType.includes('PAY')
                ? 'blue'
                : undefined
            }
          >
            {history.amounts > 0 ? `+${history.amounts}` : history.amounts}
          </CostText>
        </Content>
      </Wrapper>
    </Fragment>
  );
};

export default BubbleHistoryListItem;
