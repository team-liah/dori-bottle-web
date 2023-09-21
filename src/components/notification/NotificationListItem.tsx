import dayjs from 'dayjs';
import React from 'react';
import tw from 'tailwind-styled-components';
import { INotification } from '@/types/notification';

interface INotificationListItemProps {
  notification: INotification;
  onClick: () => void;
}

//#region Styled Component

const Wrapper = tw.div<{ $read?: boolean }>`
  flex
  w-full
  flex-col
  justify-between
  gap-2
  rounded-[15px]
  bg-white
  p-5
  ${(props) => !props.$read && 'bg-[#FAFAFF]'}
`;

const Content = tw.div`
  flex
  w-full
  flex-row
  items-center
  justify-between
  gap-2
`;

const TitleText = tw.span`
  text-[16px]
  font-[500]
  leading-[20px]
  text-main-text
`;

const ContentText = tw.span`
  text-[14px]
  font-medium
  tracking-[-0.7px]
  text-gray2
`;

const DateText = tw.span`
  text-[10px]
  text-gray2
`;

const RowBlock = tw.div`
  flex
  flex-row
  items-center
  gap-2
`;

const Icon = tw.img`
  h-[22px]
  w-[22px]
`;

//#endregion
const NotificationListItem = ({
  notification,
  onClick,
}: INotificationListItemProps) => {
  return (
    <Wrapper $read={notification.read} onClick={onClick}>
      <Content>
        <RowBlock>
          {notification.type === 'POINT' && (
            <Icon src="/svg/bubble2.svg" alt="bubble" />
          )}
          {notification.type === 'REFUND' && (
            <Icon src="/svg/bill.svg" alt="bubble" />
          )}
          {notification.type === 'NOTICE' && (
            <Icon src="/svg/notification.svg" alt="bubble" />
          )}
          {notification.type === 'PROMOTION' && (
            <Icon src="/svg/party.svg" alt="bubble" />
          )}
          {notification.type === 'PENALTY' && (
            <Icon src="/svg/alert_card.svg" alt="bubble" />
          )}
          {notification.type === 'AUTO_PAYMENT' && (
            <Icon src="/svg/bill.svg" alt="bubble" />
          )}
          {notification.type === 'LOST_CUP' && (
            <Icon src="/svg/empty_cup.svg" alt="bubble" />
          )}
          {notification.type === 'NEAR_EXPIRATION' && (
            <Icon src="/svg/alert.svg" alt="bubble" />
          )}
          <TitleText>{notification.title}</TitleText>
        </RowBlock>
      </Content>
      <Content>
        <ContentText>{notification.content}</ContentText>
      </Content>
      <Content>
        <DateText>
          {dayjs(notification.createdDate).format('YYYY.MM.DD')}
        </DateText>
      </Content>
    </Wrapper>
  );
};

export default NotificationListItem;
