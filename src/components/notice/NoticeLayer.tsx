import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import NoticeListItem from './NoticeListItem';
import { Divider, Empty, ProgressBar } from '../common/CustomStyledComponent';
import Error from '../common/Error';
import Layer from '@/components/common/Layer';
import useScroll from '@/hooks/useScroll';
import { fetcher } from '@/service/fetch';
import { INoticeList } from '@/types/notice';
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

const RentalList = tw.div`
  mt-5
  flex
  h-[calc(100dvh-150px)]
  w-full
  flex-col
  overflow-y-scroll
`;

//#endregion

const NoticeLayer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { handleScroll, isReachingEnd } = useScroll();

  const { data, isLoading, error, fetchNextPage } =
    useInfiniteQuery<INoticeList>({
      queryKey: ['rental'],
      queryFn: ({ pageParam = 0 }) =>
        fetcher('/api/rental', {
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
    <Layer title="공지사항" fullScreen={true}>
      <Wrapper>
        <RentalList
          ref={scrollRef}
          onScroll={() => scrollRef.current && handleScroll(scrollRef.current)}
        >
          <Divider />
          {isLoading && <ProgressBar />}
          {!!error && <Error message={getErrorMessage(error)} />}
          {data?.pages[0].content.length === 0 && (
            <Empty>공지사항이 없어요</Empty>
          )}
          {data?.pages.map((page) =>
            page.content.map((notice) => (
              <Fragment key={notice.id}>
                <NoticeListItem notice={notice} />
                <Divider />
              </Fragment>
            )),
          )}
          <NoticeListItem
            notice={{
              id: '1',
              title: '공지사항',
              content: '공지사항입니다.',
              createdDate: '2023-08-25T06:34:07.229763Z',
            }}
          />
        </RentalList>
      </Wrapper>
    </Layer>
  );
};

export default NoticeLayer;
