import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import NotificationListItem from './NotificationListItem';
import { Divider, Empty } from '../common/CustomStyledComponent';
import Error from '../common/Error';
import Layer from '@/components/common/Layer';
import useScroll from '@/hooks/useScroll';
import { fetcher } from '@/service/fetch';
import { INotificationList } from '@/types/notification';
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

const NotificationList = tw.div`
  flex
  h-[calc(100dvh-150px)]
  w-full
  flex-col
  overflow-y-scroll
`;

//#endregion

const NotificationLayer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { handleScroll, isReachingEnd } = useScroll();

  const { data, error, fetchNextPage } = useInfiniteQuery<INotificationList>({
    queryKey: ['notification'],
    queryFn: ({ pageParam = 0 }) =>
      fetcher('/api/notification', {
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
    <Layer title="알림" fullScreen={true}>
      <Wrapper>
        <NotificationList
          ref={scrollRef}
          onScroll={() => scrollRef.current && handleScroll(scrollRef.current)}
        >
          {!!error && <Error message={getErrorMessage(error)} />}
          {data?.pages[0].content.length === 0 && <Empty>알림이 없어요</Empty>}
          {data?.pages.map((page) =>
            page.content.map((notification) => (
              <Fragment key={notification.id}>
                <NotificationListItem notification={notification} />
                <Divider />
              </Fragment>
            )),
          )}
        </NotificationList>
      </Wrapper>
    </Layer>
  );
};

export default NotificationLayer;
