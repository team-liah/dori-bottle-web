import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { Fragment, useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import ProductListItem from './ProductListItem';
import * as Custom from '@/components/common/CustomStyledComponent';
import Error from '@/components/common/Error';
import Layer from '@/components/common/Layer';
import useScroll from '@/hooks/useScroll';
import { fetcher } from '@/service/fetch';
import { IProductFormInputs, IProductList } from '@/types/product';
import { IUser } from '@/types/user';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

const Wrapper = tw.div`
  h-full
  flex
  w-full
  flex-col
  items-center
  justify-between
  pt-8
`;

const ProductList = tw.div`
  flex
  max-h-[60vh]
  w-full
  flex-col
  gap-[14px]
  overflow-y-scroll
  p-4
`;

const DiscountLabel = tw.div`
  relative
  mb-2
  flex
  h-[50px]
  w-full
  items-center
  justify-center
`;

const LabelImage = tw.img`
  absolute
  h-[60px]
  object-cover
`;

const DiscountText = tw.div`
  absolute
  pb-[5px]
  text-[13px]
  font-bold
  leading-[22px]
  tracking-[-0.39px]
  text-white
`;

//#endregion

const ChargeListLayer = () => {
  const { control, formState, watch } = useFormContext<IProductFormInputs>();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: profile } = useQuery<IUser>({
    queryKey: ['profile'],
    queryFn: () => fetcher('/api/me/profile'),
  });
  const { handleScroll, isReachingEnd } = useScroll();
  const { data, error, fetchNextPage } = useInfiniteQuery<IProductList>({
    queryKey: ['product'],
    queryFn: ({ pageParam = 0 }) =>
      fetcher('/api/payment/category', {
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageable.hasNext) {
        return lastPage.pageable.page + 1;
      }
    },
  });

  useEffect(() => {
    if (isReachingEnd) {
      fetchNextPage();
    }
  }, [fetchNextPage, isReachingEnd]);

  return (
    <Layer
      title="버블충전"
      fullScreen={true}
      footer={
        <Custom.Button
          type="submit"
          disabled={!watch('product') || formState.isSubmitting}
        >
          다음
        </Custom.Button>
      }
    >
      <Wrapper>
        {(profile?.group?.discountRate || 0) > 0 && (
          <DiscountLabel>
            <LabelImage src="/assets/discount-label.png" />
            <DiscountText>{`기관 할인 ${profile?.group?.discountRate}% 적용가`}</DiscountText>
          </DiscountLabel>
        )}
        <ProductList
          ref={scrollRef}
          onScroll={() => scrollRef.current && handleScroll(scrollRef.current)}
        >
          {!!error && <Error message={getErrorMessage(error)} />}
          {data?.pages[0].content.length === 0 && (
            <Custom.Empty>아직 상품이 없어요</Custom.Empty>
          )}
          <Controller
            name="product"
            control={control}
            render={({ field }) => (
              <Fragment>
                {data?.pages.map((page) =>
                  page.content.map((product) => (
                    <ProductListItem
                      key={product.id}
                      product={product}
                      selected={field.value?.id === product.id}
                      onClick={() => field.onChange(product)}
                    />
                  )),
                )}
              </Fragment>
            )}
          />
        </ProductList>
      </Wrapper>
    </Layer>
  );
};

export default ChargeListLayer;
