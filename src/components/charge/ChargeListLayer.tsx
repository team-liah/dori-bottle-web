import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment, useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import ProductListItem from './ProductListItem';
import Error from '../common/Error';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';
import useScroll from '@/hooks/useScroll';
import { fetcher } from '@/service/fetch';
import { IProductFormInputs, IProductList } from '@/types/product';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

const Wrapper = tw.div`
  h-full
  flex
  w-full
  flex-col
  justify-between
  pt-8
`;

const ProductList = tw.div`
  flex
  w-full
  flex-col
  gap-[14px]
`;

//#endregion

const ChargeListLayer = () => {
  const { control, watch } = useFormContext<IProductFormInputs>();

  const scrollRef = useRef<HTMLDivElement>(null);
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
      footer={
        <Custom.Button type="submit" disabled={!watch('product')}>
          다음
        </Custom.Button>
      }
    >
      <Wrapper>
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
