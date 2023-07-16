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
