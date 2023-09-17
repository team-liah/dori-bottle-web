import { IPageable } from './common';

export type PaymentType = 'CARD' | 'KAKAO' | 'NAVER';
export type PaymentHistoryType = 'SAVE_POINT' | 'LOST_CUP' | 'UNBLOCK_ACCOUNT';
export type PaymentHistoryStatus = 'SUCCEEDED' | 'CANCELED';

interface ICard {
  acquirer: string;
  number: string;
  ownerType: string;
  type: string;
}
export interface IPaymentMethodList {
  content: IPaymentMethod[];
  pageable: IPageable;
}
export interface IPaymentMethod {
  id: React.Key;
  type: PaymentType;
  default: boolean;
  card?: ICard;
}

export interface IPaymentHistoryList {
  content: IPaymentHistory[];
  pageable: IPageable;
}

export interface IPaymentHistory {
  id: string;
  price: number;
  remainPointAmounts?: number;
  savePointAmounts?: number;
  status: PaymentHistoryStatus;
  type: PaymentHistoryType;
  userId: string;
  card: ICard;
  createdDate: string;
}

export interface IPaymentRefundFormInputs {
  amount: number;
  bankName: string;
  bankAccountNumber: string;
  bankAccountOwner: string;
}
