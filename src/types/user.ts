import { IBlockCause, IPenalty } from './penalty';

export type GroupType = 'UNIVERSITY' | 'COMPANY';
export type Gender = 'MALE' | 'FEMALE';

export interface ILoginFormInputs {
  loginId: string;
  loginPassword: string;
}

export interface IRegisterFormInputs {
  name: string;
  gender: string;
  birthDate: string;
  agreedTermsOfService: boolean;
  agreedTermsOfPrivacy: boolean;
  agreedTermsOfMarketing: boolean;
}

export interface IInviteRegisterFormInputs {
  invitationCode: string;
}

export interface IAuth {
  id: React.Key;
  loginId: string;
  role: string;
  name: string;
  alertCount: number;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken?: string;
}
export interface IUser {
  id: React.Key;
  loginId: string;
  name: string;
  active: boolean;
  phoneNumber?: string;
  invitationCode?: string;
  invitationCount?: number;
  inviterId?: React.Key;
  birthDate?: string;
  description?: string;
  gender?: Gender;
  registeredDate?: string;
  group?: IGroup;
  penaltyCount?: number;
  penalties?: IPenalty[];
  blocked?: boolean;
  blockedCauses?: IBlockCause[];
  createdDate?: string;
  lastModifiedDate?: string;
}
export interface IGroup {
  id: string;
  name: string;
  type: GroupType;
}
