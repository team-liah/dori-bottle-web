import React from 'react';
import tw from 'tailwind-styled-components';

//#region Styled Component

const Wrapper = tw.div`
  flex
  min-h-[200px]
  flex-col
  items-center
  gap-5
  p-5
`;

//#endregion

const NotPaymentModal = () => {
  return (
    <Wrapper>
      <span>이용 전 결제수단 등록이 필요해요</span>
      <span>토스페이먼츠</span>
    </Wrapper>
  );
};

export default NotPaymentModal;
