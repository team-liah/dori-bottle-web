import { Regex } from '@/constants/Regex';
import { PaymentHistoryType } from '@/types/payment';
import { RentalStatus } from '@/types/rental';

export const getHypenTel = (tel: string) => {
  return tel
    .replace(Regex.ONLY_NUMBER_REGEX, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
};

export const getOnlyNumber = (str: string) => {
  return str.replace(Regex.ONLY_NUMBER_REGEX, '');
};

export const getTimeFormat = (second: number) => {
  const min = Math.floor(second / 60);
  const sec = second % 60;

  return `${min}:${sec < 10 ? `0${sec}` : sec}`;
};

export const getRentalStatus = (status: RentalStatus) => {
  switch (status) {
    case 'PROCEEDING':
      return '대여 중';
    case 'SUCCEEDED':
      return '반납 완료';
    case 'FAILED':
      return '분실';
    default:
      return '';
  }
};

export const getPaymentHistoryStatus = (status: PaymentHistoryType) => {
  switch (status) {
    case 'SAVE_POINT':
      return '버블 충전';
    case 'LOST_CUP':
      return '컵 분실';
    case 'UNBLOCK_ACCOUNT':
      return '블락 해제';
    default:
      return '';
  }
};
