import React from 'react';
import { useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';
import { IPaymentRefundFormInputs } from '@/types/payment';
//#region Styled Component

const Wrapper = tw.div`
  h-full
  flex
  w-full
  flex-col
  justify-between
  pt-8
`;

const ProductWrapper = tw.div`
  mb-8
  px-5
`;

const RefundAmountWrapper = tw.div`
  flex
  h-[80px]
  flex-row
  items-center
  justify-between
  rounded-[15px]
  px-5
  shadow-[0_0_5px_0px_rgba(17,17,17,0.15)]
`;

const AmountText = tw.span`
  text-[18px]
  font-bold
  text-gray1
`;

const PolicyWrapper = tw.div`
  flex
  w-full
  flex-col
  gap-4
  bg-back-color
  p-5
  text-[12px]
  font-medium
  leading-[22px]
  tracking-[-0.36px]
  text-gray2
`;

const BulletTextContainer = tw.ul`
  flex
  list-outside
  list-disc
  flex-col
  gap-3
  pl-[22px]
`;

const BulletText = tw.li`
  text-[12px]
  font-normal
`;

//#endregion

const bulletList = [
  <p>
    블락처리로 인한 회원 탈퇴 시, 버블은 개당 <b>350원</b>의 가격으로
    환불됩니다.
  </p>,
  <p>
    환불금은 고객님께서 입력하신 계좌로 입금되며, <b>1~2 영업일</b> 가량
    소요됩니다.
  </p>,
  <p>
    블락처리로 인한 탈퇴 시 <b>동일 정보로 재가입이 불가능</b>합니다.
  </p>,
];

const PaymentRefundLayer = () => {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext<IPaymentRefundFormInputs>();

  return (
    <Layer
      title="버블 환불 및 회원 탈퇴"
      fullScreen={true}
      footer={
        <Custom.Button type="submit" disabled={isSubmitting}>
          다음
        </Custom.Button>
      }
    >
      <Wrapper>
        <ProductWrapper>
          <RefundAmountWrapper>
            <AmountText>버블 환불</AmountText>
            <AmountText>{watch('amount')?.toLocaleString()}원</AmountText>
          </RefundAmountWrapper>
        </ProductWrapper>
        <PolicyWrapper>
          [탈퇴 및 환불 규정]
          <BulletTextContainer>
            {bulletList?.map((bullet, index) => (
              <BulletText key={index}>{bullet}</BulletText>
            ))}
          </BulletTextContainer>
        </PolicyWrapper>
      </Wrapper>
    </Layer>
  );
};

export default PaymentRefundLayer;
