import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import RentalListItem from './RentalListItem';
import { Divider, Empty, ProgressBar } from '../common/CustomStyledComponent';
import Error from '../common/Error';
import SelectBottom from '../common/SelectBottom';
import Layer from '@/components/common/Layer';
import useScroll from '@/hooks/useScroll';
import { fetcher } from '@/service/fetch';
import { IRentalList, RentalStatus } from '@/types/rental';
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

const SelectWrapper = tw.div`
  px-5
`;

const RentalList = tw.div`
  mt-5
  flex
  h-[calc(100dvh-150px)]
  w-full
  flex-col
  overflow-y-scroll
`;

//#endregion

const selectItems = [
  { value: 'ALL', label: '전체내역' },
  { value: 'PROCEEDING', label: '대여 중' },
  { value: 'SUCCEEDED', label: '반납완료' },
  { value: 'FAILED', label: '분실' },
];

const RentalHistoryLayer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<RentalStatus | 'ALL'>('ALL');

  const { handleScroll, isReachingEnd } = useScroll();

  const { data, isLoading, error, fetchNextPage } =
    useInfiniteQuery<IRentalList>({
      queryKey: ['rental', status],
      queryFn: ({ pageParam = 0 }) =>
        fetcher('/api/rental', {
          page: pageParam,
          status: status !== 'ALL' ? status : '',
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
    <Layer title="이용내역" fullScreen={true}>
      <Wrapper>
        <SelectWrapper>
          <SelectBottom
            items={selectItems}
            value={status}
            onChange={(value) => setStatus(value as RentalStatus | 'ALL')}
          />
        </SelectWrapper>
        <RentalList
          ref={scrollRef}
          onScroll={() => scrollRef.current && handleScroll(scrollRef.current)}
        >
          <Divider />
          {isLoading && <ProgressBar />}
          {!!error && <Error message={getErrorMessage(error)} />}
          {data?.pages[0].content.length === 0 && (
            <Empty>이용내역이 없어요</Empty>
          )}
          {data?.pages.map((page) =>
            page.content.map((rental) => (
              <Fragment key={rental.id}>
                <RentalListItem rental={rental} />
                <Divider />
              </Fragment>
            )),
          )}
        </RentalList>
      </Wrapper>
    </Layer>
  );
};

export default RentalHistoryLayer;
