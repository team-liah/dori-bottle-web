import { IPageable } from './common';

export interface IRentalList {
  content: IRental[];
  pageable: IPageable;
}

export type RentalStatus = 'PROCEEDING' | 'SUCCEEDED' | 'FAILED';

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

export interface IMachine {
  id: string;
  no: string;
  name: string;
  address: Address;
  type?: 'VENDING' | 'COLLECTION';
}

export interface Address {
  zipCode: string;
  address1: string;
  address2: string;
}
