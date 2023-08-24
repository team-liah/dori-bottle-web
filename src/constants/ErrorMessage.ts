interface IErrorMessage {
  [index: string]: string;
}

export const ERROR_MESSAGE: IErrorMessage = {
  // Common
  A000: '잠시 후 다시 시도해주세요',
  A001: '입력값을 확인해주세요',
  A006: '잘못된 접근입니다',
  A007: '인증번호를 다시 확인해주세요',
  G003: '기본 결제수단은 삭제할 수 없습니다',
};
