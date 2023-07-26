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

export interface IAuth {
  loginId: string;
  role: string;
  name: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface IProfile {
  id: string;
  loginId: string;
  name: string;
  phoneNumber: string;
  invitationCode: string;
  birthDate: string;
  gender: string;
  role: string;
}
