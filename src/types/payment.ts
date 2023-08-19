import { IPageable } from './common';

export type PaymentType = 'CREDIT' | 'KAKAO' | 'NAVER';
export type PaymentHistoryType = 'CHARGE' | 'LOST';

export interface IPaymentMethod {
  id: React.Key;
  type: PaymentType;
  cardName?: string;
  cardNum?: string;
  isDefault: boolean;
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
