import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';
import { fetcher } from '@/service/fetch';
import { IPaymentRefundFormInputs } from '@/types/payment';
import { IUser } from '@/types/user';
import { getBlockCauseTypeLabel } from '@/utils/util';
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
  flex
  flex-col
  gap-4
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
    패널티 비용은 <b>컵 분실 시점으로부터 2주 이내</b>로 컵을 반납할 시{' '}
    <b>환불 가능</b>합니다.
  </p>,
  <p>
    <b>컵 반납 후</b> 해당 내용을 1:1문의를 통해 <b>접수</b>해주시기 바랍니다.
  </p>,
  <p>블락해제 비용은 환불이 불가능하므로 유의해 주시기 바랍니다.</p>,
];

const PaymentPenaltyLayer = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext<IPaymentRefundFormInputs>();

  const { data: profile } = useQuery<IUser>({
    queryKey: ['profile'],
    queryFn: () => fetcher('/api/me/profile'),
  });

  return (
    <Layer
      title="블락해제"
      fullScreen={true}
      footer={
        <Custom.Button type="submit" disabled={isSubmitting}>
          해제하기
        </Custom.Button>
      }
    >
      <Wrapper>
        <ProductWrapper>
          {profile?.blockedCauses?.map((cause, index) => (
            <RefundAmountWrapper key={index}>
              <AmountText>{getBlockCauseTypeLabel(cause.type)}</AmountText>
              <AmountText>{cause.clearPrice?.toLocaleString()}원</AmountText>
            </RefundAmountWrapper>
          ))}
        </ProductWrapper>
        <PolicyWrapper>
          [이용 및 환불 규정]
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

export default PaymentPenaltyLayer;
