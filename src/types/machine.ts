import { IPageable } from './common';

export type MachineType = 'VENDING' | 'COLLECTION' | 'WASHING';
export const MACHINE_TYPES: MachineType[] = [
  'VENDING',
  'COLLECTION',
  'WASHING',
];

export type MachineState = 'NORMAL' | 'MALFUNCTION';
export const MACHINE_STATES: MachineState[] = ['NORMAL', 'MALFUNCTION'];

export interface IAddress {
  zipCode: string;
  address1: string;
  address2?: string | null;
}

export interface IMachine {
  id: React.Key;
  no: string;
  name: string;
  type: MachineType;
  address: IAddress;
  capacity: number;
  cupAmounts: number;
  state: MachineState;
  lng: number;
  lat: number;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface IMachineFormValue extends Omit<IMachine, 'id'> {}

export interface IMachinesParams {
  no?: string;
  name?: string;
  type?: MachineType;
  state?: MachineState;
  addressKeyword?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface IMachinesResponse {
  content: IMachine[];
  pageable: IPageable;
}

export const getMachineTypeLabel = (type?: MachineType) => {
  switch (type) {
    case 'VENDING':
      return '자판기';
    case 'COLLECTION':
      return '수거함';
    case 'WASHING':
      return '세척기';
    default:
      return '';
  }
};

export const getMachineStateLabel = (state?: MachineState) => {
  switch (state) {
    case 'NORMAL':
      return '✅ 정상';
    case 'MALFUNCTION':
      return '⛔️ 고장';
    default:
      return '';
  }
};
