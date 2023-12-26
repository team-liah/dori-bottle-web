import { IPageable } from './common';

export type BubbleHistoryType =
  | 'SAVE_REGISTER_REWARD'
  | 'SAVE_REGISTER_INVITER_REWARD'
  | 'SAVE_INVITE_REWARD'
  | 'SAVE_PAY'
  | 'CANCEL_SAVE'
  | 'CANCEL_USE'
  | 'USE_CUP'
  | 'DISAPPEAR';

export interface IRemainPoint {
  payPoint: number;
  freePoint: number;
}

export interface IBubbleHistoryList {
  content: IBubbleHistory[];
  pageable: IPageable;
}

export interface IBubbleHistory {
  id: string;
  userId: string;
  eventType: BubbleHistoryType;
  eventTitle: string;
  amounts: number;
  createdDate: string;
  lastModifiedDate: string;
}
