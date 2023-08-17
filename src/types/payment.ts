export type PaymentType = 'CREDIT' | 'KAKAO' | 'NAVER';

export interface IPayment {
  id: React.Key;
  type: PaymentType;
  cardName?: string;
  cardNum?: string;
  isDefault: boolean;
}
