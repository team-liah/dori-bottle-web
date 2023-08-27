import { IPageable } from './common';

export interface INoticeList {
  content: INotice[];
  pageable: IPageable;
}

export interface INotice {
  id: string;
  title: string;
  content: string;
  createdDate: string;
}
