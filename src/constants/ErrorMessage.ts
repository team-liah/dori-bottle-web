interface IErrorMessage {
  [index: string]: string;
}

export const ERROR_MESSAGE: IErrorMessage = {
  // Common
  A000: '잠시 후 다시 시도해주세요',
  A001: '입력값을 확인해주세요',
  A006: '잘못된 접근입니다',
  A007: '인증번호를 다시 확인해주세요',
  C007: '정지된 사용자입니다',
  G002: '등록된 결제수단이 없습니다',
  G003: '기본 결제수단은 삭제할 수 없습니다',
  G006: '결제되지 않은 패널티가 있습니다',
};
