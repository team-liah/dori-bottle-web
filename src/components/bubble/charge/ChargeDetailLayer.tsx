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
  gap-1
  pl-[22px]
`;

const BulletText = tw.li`
  text-[12px]
  font-normal
  leading-[20px]
  tracking-[-0.6px]
`;

//#endregion

const bulletList = [
  <p>
    버블 구매 후 사용하지 않은 경우 ‘결제내역’ 탭에서 즉시 전액 환불 가능합니다.
  </p>,
  <p>
    이벤트 참여 등으로 지급된 무료 버블이 우선 차감되며, 이로 인해 충전한 버블이
    사용되지 않았을 경우 어플을 통해 즉시 환불이 가능합니다.
  </p>,
  <p>
    구매한 버블을 1개 이상 사용하였을 경우 환불에 제한이 발생하며, 환불을
    위해서는 고객센터로 문의주시기 바랍니다.
  </p>,
  <p>
    블락처리로 인한 회원 탈퇴 시 잔여 버블에 한하여 개당 300원의 가격으로
    환불됩니다.
  </p>,
  <p>무료버블은 환불할 수 없습니다.</p>,
];

const ChargeDetailLayer = ({ onClickBack }: IChargeDetailLayerProps) => {
  const {
    watch,
    formState: { submitCount, isSubmitting },
  } = useFormContext<IProductFormInputs>();

  return (
    <Layer
      title="버블충전"
      fullScreen={true}
      footer={
        <Custom.Button type="submit" disabled={submitCount > 1 || isSubmitting}>
          충전하기
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
