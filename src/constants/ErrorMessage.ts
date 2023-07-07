interface IErrorMessage {
  [index: string]: string;
}

export const ERROR_MESSAGE: IErrorMessage = {
  // Common
  A000: '잠시 후 다시 시도해주세요',
  A001: '입력값을 확인해주세요',
  A007: '인증번호가 일치하지 않습니다',
};
