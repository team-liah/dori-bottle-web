import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import BubbleHistoryListItem from './BubbleHistoryListItem';
import {
  Divider,
  Empty,
  ProgressBar,
} from '@/components/common/CustomStyledComponent';
import Error from '@/components/common/Error';
import Layer from '@/components/common/Layer';
import SelectBottom from '@/components/common/SelectBottom';
import useScroll from '@/hooks/useScroll';
import { fetcher } from '@/service/fetch';
import { IBubbleHistoryList, IRemainPoint } from '@/types/point';
import { getErrorMessage } from '@/utils/error';

type BubbleHistoryType = 'ALL' | 'SAVE' | 'USE';
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

const HistoryList = tw.div`
  mt-5
  flex
  h-[calc(100dvh-250px)]
  w-full
  flex-col
  overflow-y-scroll
`;

const BubbleInfoWrapper = tw.div`
  mb-8
  mt-2
  flex
  gap-2
`;

const BubbleInfo = tw.div<{ $color: 'yellow' | 'blue' }>`
  flex
  flex-1
  flex-row
  items-center
  justify-between
  rounded-[20px]
  border-[1.5px]
  border-solid
  px-6
  py-3
  text-[16px]
  font-bold
  tracking-[-0.48px]
  ${({ $color }) =>
    $color === 'yellow' ? 'text-point-yellow' : 'text-main-blue'}
`;

//#endregion

const selectItems = [
  { value: 'ALL', label: '전체내역' },
  { value: 'SAVE', label: '충전내역' },
  { value: 'USE', label: '사용내역' },
];

const BubbleHistoryLayer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState<BubbleHistoryType>('ALL');

  const { data: remainBubble } = useQuery<IRemainPoint>({
    queryKey: ['point', 'remain-point'],
    queryFn: () => fetcher('/api/point/remain-point'),
  });

  const { handleScroll, isReachingEnd } = useScroll();
  const { data, isLoading, error, fetchNextPage } =
    useInfiniteQuery<IBubbleHistoryList>({
      queryKey: ['point', 'history', type],
      queryFn: ({ pageParam = 0 }) =>
        fetcher('/api/point/history', {
          page: pageParam,
          historyType: type !== 'ALL' ? type : '',
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
    <Layer title="버블내역" fullScreen={true}>
      <Wrapper>
        <SelectWrapper>
          <BubbleInfoWrapper>
            <BubbleInfo $color="yellow">
              <span>무료 버블</span>
              <span>{remainBubble?.freePoint}개</span>
            </BubbleInfo>
            <BubbleInfo $color="blue">
              <span>충전 버블</span>
              <span>{remainBubble?.payPoint}개</span>
            </BubbleInfo>
          </BubbleInfoWrapper>
          <SelectBottom
            items={selectItems}
            value={type}
            onChange={(value) => setType((value as BubbleHistoryType) ?? 'ALL')}
          />
        </SelectWrapper>
        <HistoryList
          ref={scrollRef}
          onScroll={() => scrollRef.current && handleScroll(scrollRef.current)}
        >
          <Divider />
          {isLoading && <ProgressBar />}
          {!!error && <Error message={getErrorMessage(error)} />}
          {data?.pages[0].content.length === 0 && (
            <Empty>버블내역이 없어요</Empty>
          )}
          {data?.pages.map((page) =>
            page.content.map((history) => (
              <Fragment key={history.id}>
                <BubbleHistoryListItem history={history} />
                <Divider />
              </Fragment>
            )),
          )}
        </HistoryList>
      </Wrapper>
    </Layer>
  );
};

export default BubbleHistoryLayer;
