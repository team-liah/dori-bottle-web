import { IPageable } from './common';

export interface INotificationList {
  content: INotification[];
  pageable: IPageable;
}

export type NotificationType = 'POINT' | 'NOTICE' | 'PROMOTION';

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
