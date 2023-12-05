import { Regex } from '@/constants/Regex';
import { PaymentHistoryType } from '@/types/payment';
import { BlockCauseType, PenaltyType } from '@/types/penalty';
import { BubbleHistoryType } from '@/types/point';
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

export const copyToClipboard = async (
  shareTarget: string,
  callback: () => void,
) => {
  await navigator.clipboard.writeText(shareTarget);
  callback();
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

export const getBubbleHistoryStatus = (status: BubbleHistoryType) => {
  switch (status) {
    case 'SAVE_REGISTER_REWARD':
      return '회원가입 보상';
    case 'SAVE_REGISTER_INVITER_REWARD':
      return '초대코드 입력 보상';
    case 'SAVE_INVITE_REWARD':
      return '친구초대 보상';
    case 'SAVE_PAY':
      return '버블 충전';
    case 'CANCEL_SAVE':
      return '적립 취소';
    case 'USE_CUP':
      return '컵 사용';
    case 'DISAPPEAR':
      return '소멸';
    default:
      return '';
  }
};
export const getPenaltyTypeLabel = (type?: PenaltyType) => {
  switch (type) {
    case 'DAMAGED_CUP':
      return '파손된 컵 반납';
    case 'NON_MANNER':
      return '비매너 행동';
    case 'ETC':
      return '기타';
    default:
      return '';
  }
};

export const getBlockCauseTypeLabel = (type?: BlockCauseType) => {
  switch (type) {
    case 'FIVE_PENALTIES':
      return '블락해제 비용';
    case 'LOST_CUP_PENALTY':
      return '분실 페널티';
    default:
      return '';
  }
};
