import { IPageable } from './common';
import { IMachine } from './machine';

export interface IRentalList {
  content: IRental[];
  pageable: IPageable;
}

export type RentalStatus =
  | 'PROCEEDING'
  | 'CONFIRMED'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'CANCELED';

export const RENTAL_STATUSES: RentalStatus[] = [
  'PROCEEDING',
  'CONFIRMED',
  'SUCCEEDED',
  'FAILED',
  'CANCELED',
];

export interface IRental {
  id: string;
  no: string;
  userId: string;
  cupId: string;
  fromMachine: IMachine;
  toMachine: IMachine;
  withIce: boolean;
  cost: number;
  succeededDate: string;
  createdDate: string;
  expiredDate: string;
  status: RentalStatus;
}
