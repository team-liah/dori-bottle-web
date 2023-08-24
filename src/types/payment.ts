import { IPageable } from './common';

export type PaymentType = 'CARD' | 'KAKAO' | 'NAVER';
export type PaymentHistoryType = 'CHARGE' | 'LOST';

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
  paymentMethod: IPaymentMethod;
  userId: string;
  price: number;
  amount?: number;
  remainingAmount?: number;
  type: PaymentHistoryType;
  refunded?: boolean;
  createdDate: string;
}
