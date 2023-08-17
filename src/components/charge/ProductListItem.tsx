import React from 'react';
import tw from 'tailwind-styled-components';
import { IProduct } from '@/types/product';

interface IProductListItemProps {
  product: IProduct;
  selected?: boolean;
  onClick?: () => void;
}

//#region Styled Component

const Wrapper = tw.div<{ $selected?: boolean }>`
  flex
  h-[80px]
  w-full
  flex-row
  items-center
  justify-between
  rounded-[15px]
  bg-white
  px-5
  transition-all
  duration-100
  ${(props) =>
    props.$selected
      ? 'border-[1.5px] border-main-blue shadow-[0_0_11px_0px_rgba(5,107,241,0.15)]'
      : 'shadow-[0_0_5px_0px_rgba(17,17,17,0.15)]'}
`;

const RowWrapper = tw.div`
  flex
  flex-row
  items-center
  gap-3
`;

const PriceWrapper = tw.div`
  flex
  flex-col
  items-end
  justify-center
`;

const BubbleIcon = tw.img`
  h-[43px]
  w-[43px]
`;

const AmountText = tw.span`
  text-[18px]
  font-bold
  text-gray1
`;

const DiscountAmountText = tw.span`
  text-[14px]
  font-medium
  text-unactivated
  line-through
`;

const DiscountTag = tw.span`
  flex
  h-[24px]
  w-[48px]
  items-center
  justify-center
  rounded-full
  border-[1px]
  border-main-blue
  text-[12px]
  font-bold
  text-main-blue
`;

//#endregion
const ProductListItem = ({
  product,
  selected,
  onClick,
}: IProductListItemProps) => {
  return (
    <Wrapper $selected={selected} onClick={onClick}>
      <RowWrapper>
        <BubbleIcon src="/svg/bubble.svg" alt="next" />
        <AmountText>{product.amounts}개</AmountText>
      </RowWrapper>
      <PriceWrapper>
        {product.discountRate > 0 && (
          <DiscountAmountText>
            {product.price?.toLocaleString()}원
          </DiscountAmountText>
        )}
        <RowWrapper>
          {product.discountRate > 0 && (
            <DiscountTag>-{product.discountRate}%</DiscountTag>
          )}
          <AmountText>{product.discountPrice?.toLocaleString()}원</AmountText>
        </RowWrapper>
      </PriceWrapper>
    </Wrapper>
  );
};

export default ProductListItem;
