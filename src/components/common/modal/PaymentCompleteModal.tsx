import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import { IProduct } from '@/types/product';

interface IPaymentCompleteModalProps {
  product: IProduct;
  onClickHome: () => void;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-[240px]
  flex-col
  items-center
  bg-white
  p-7
`;

const BubbleIcon = tw.img`
  h-[80px]
  w-[80px]
`;

const TitleText = tw.div`
  mb-7
  whitespace-pre
  text-center
  text-[20px]
  font-bold
  leading-[26px]
  text-gray1
`;

//#endregion

const PaymentCompleteModal = ({
  product,
  onClickHome,
}: IPaymentCompleteModalProps) => {
  return (
    <Wrapper>
      <BubbleIcon src="/svg/bubble.svg" alt="next" />
      <TitleText>{`${product.amounts}개를\n충전했어요!`}</TitleText>
      <Custom.Button onClick={onClickHome}>홈으로</Custom.Button>
    </Wrapper>
  );
};

export default PaymentCompleteModal;
