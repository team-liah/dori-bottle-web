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
import { IRentalList, RENTAL_STATUSES, RentalStatus } from '@/types/rental';
import { getErrorMessage } from '@/utils/error';
import { getRentalStatus } from '@/utils/util';

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
            items={[
              { label: '전체', value: 'ALL' },
              ...RENTAL_STATUSES.filter((value) => value !== 'PROCEEDING').map(
                (status) => ({
                  label: getRentalStatus(status),
                  value: status,
                }),
              ),
            ]}
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
