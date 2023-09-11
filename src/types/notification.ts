import { IPageable } from './common';

export interface INotificationList {
  content: INotification[];
  pageable: IPageable;
}

export type NotificationType =
  | 'POINT'
  | 'REFUND'
  | 'NOTICE'
  | 'PROMOTION'
  | 'PENALTY'
  | 'LOST_CUP'
  | 'NEAR_EXPIRATION';

export interface INotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: number;
  content: string;
  targetId: string;
  createdDate: string;
  read: boolean;
}
