export type PenaltyType = 'DAMAGED_CUP' | 'NON_MANNER' | 'ETC';
export const PENALTY_TYPES: PenaltyType[] = [
  'DAMAGED_CUP',
  'NON_MANNER',
  'ETC',
];

export type BlockCauseType = 'FIVE_PENALTIES' | 'LOST_CUP_PENALTY';
export const BLOCK_CAUSE_TYPES: BlockCauseType[] = [
  'FIVE_PENALTIES',
  'LOST_CUP_PENALTY',
];

export interface IPenalty {
  id: React.Key;
  userId: React.Key;
  type: PenaltyType;
  cause: string;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface IBlockCause {
  id: React.Key;
  userId: React.Key;
  type: BlockCauseType;
  description?: string;
  createdDate?: string;
  lastModifiedDate?: string;
  clearPrice?: number;
}

export interface IPenaltyFormValue {
  penaltyType: PenaltyType;
  penaltyCause: string;
}
