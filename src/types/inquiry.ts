import { useInfiniteQuery } from '@tanstack/react-query';
import { IPageable } from './common';
import { IUser } from './user';
import api from '@/service/api';
import { fetcher } from '@/service/fetch';

export type InquiryType = 'REFUND' | 'ETC';
export const INQUIRY_TYPES: InquiryType[] = ['REFUND', 'ETC'];

export type InquiryStatus = 'PROCEEDING' | 'SUCCEEDED';
export const INQUIRY_STATUSES: InquiryStatus[] = ['PROCEEDING', 'SUCCEEDED'];

export type InquiryTargetType = 'RENTAL' | 'PAYMENT';
export const INQUIRY_TARGET_TYPES: InquiryTargetType[] = ['RENTAL', 'PAYMENT'];

export interface IBankAccount {
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

export interface IInquiry {
  id: React.Key;
  user: IUser;
  type: InquiryType;
  bankAccount?: IBankAccount;
  content: string;
  target?: {
    id: React.Key;
    classType: InquiryTargetType;
  };
  imageUrls: string[];
  answer: string;
  status: InquiryStatus;
  createdDate: string;
  lastModifiedDate: string;
}

export interface IInquirysParams {
  userId?: React.Key;
  type?: InquiryType;
  status?: InquiryStatus;
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface IInquirysResponse {
  content: IInquiry[];
  pageable: IPageable;
}

export interface IAnswerInquiryFormValue {
  answer: string;
}

export const useInfiniteInquirys = (params: IInquirysParams = {}) => {
  return useInfiniteQuery<IInquirysResponse>({
    queryKey: ['inquiry', params],
    queryFn: ({ pageParam = 0 }) =>
      fetcher('/api/inquiry', {
        ...params,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageable.hasNext) {
        return lastPage.pageable.page + 1;
      }
    },
  });
};

export const createInquiry = (data: Partial<IInquiry>) => {
  return api.post('/api/inquiry', data);
};

export const getInquiryTypeLabel = (type?: InquiryType) => {
  switch (type) {
    case 'REFUND':
      return '환불';
    case 'ETC':
      return '기타';
    default:
      return '알 수 없음';
  }
};

export const getInquiryStatusLabel = (status?: InquiryStatus) => {
  switch (status) {
    case 'PROCEEDING':
      return '처리 중';
    case 'SUCCEEDED':
      return '답변 완료';
    default:
      return '알 수 없음';
  }
};
