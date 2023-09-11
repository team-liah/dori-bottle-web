import React from 'react';
import { useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import ProductListItem from './ProductListItem';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';
import { IProductFormInputs } from '@/types/product';

interface IChargeDetailLayerProps {
  onClickBack: () => void;
}

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
    버블은 구매 후 <b>전액환불 가능</b>하나, 구매한 버블을{' '}
    <b>1개 이상 사용하였을 경우 환불이 불가</b>합니다.
  </p>,
  <p>
    이벤트 참여 등으로 지급된 <b>무료 버블이 우선 차감</b>되며, 이로 인해 충전한
    버블이 사용되지 않았을 경우 환불이 가능합니다.
  </p>,
  <p>환불 가능 여부는 ‘결제내역'에서 확인 가능합니다.</p>,
  <p>
    블락처리로 인한 회원 탈퇴 시 버블 환불이 가능하나, 개당 350원의 가격으로
    환불 됩니다.
  </p>,
  <p>사용자의 변심으로 탈퇴하는 경우 환불이 불가합니다.</p>,
  <p>무료버블은 환불할 수 없습니다.</p>,
];

const ChargeDetailLayer = ({ onClickBack }: IChargeDetailLayerProps) => {
  const {
    watch,
    formState: { submitCount },
  } = useFormContext<IProductFormInputs>();

  return (
    <Layer
      title="버블충전"
      fullScreen={true}
      footer={
        <Custom.Button type="submit" disabled={submitCount > 1}>
          다음
        </Custom.Button>
      }
      onClickBack={onClickBack}
    >
      <Wrapper>
        <ProductWrapper>
          <ProductListItem product={watch('product')} />
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

export default ChargeDetailLayer;
