export type MachineType = 'VENDING' | 'COLLECTION' | 'WASHING';
export const MACHINE_TYPES: MachineType[] = [
  'VENDING',
  'COLLECTION',
  'WASHING',
];

export type MachineState = 'NORMAL' | 'MALFUNCTION' | 'PAUSE';
export const MACHINE_STATES: MachineState[] = ['NORMAL', 'MALFUNCTION'];

export interface IAddress {
  zipCode: string;
  address1: string;
  address2?: string | null;
}

export interface IMachineListItem
  extends Pick<IMachine, 'id' | 'type' | 'location' | 'state'> {}
export interface IMachine {
  id: React.Key;
  no: string;
  name: string;
  type: MachineType;
  imageUrl?: string;
  address: IAddress;
  capacity: number;
  cupAmounts: number;
  state: MachineState;
  rentCupAmounts?: number;
  rentIceCupAmounts?: number;
  location: {
    latitude: number;
    longitude: number;
  };
  createdDate?: string;
  lastModifiedDate?: string;
}

export const getMachineTypeLabel = (type?: MachineType) => {
  switch (type) {
    case 'VENDING':
      return '자판기';
    case 'COLLECTION':
      return '반납함';
    case 'WASHING':
      return '세척기';
    default:
      return '';
  }
};

export const getMachineStateLabel = (state?: MachineState) => {
  switch (state) {
    case 'NORMAL':
      return '사용가능';
    case 'MALFUNCTION':
      return '사용불가';
    default:
      return '';
  }
};
