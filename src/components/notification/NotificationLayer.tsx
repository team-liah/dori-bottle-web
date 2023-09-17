import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import React, { Fragment, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import NotificationListItem from './NotificationListItem';
import { Empty } from '../common/CustomStyledComponent';
import Error from '../common/Error';
import Layer from '@/components/common/Layer';
import useAuth from '@/hooks/useAuth';
import useScroll from '@/hooks/useScroll';
import api from '@/service/api';
import { fetcher } from '@/service/fetch';
import { INotification, INotificationList } from '@/types/notification';
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
  h-[calc(100dvh-76px)]
  w-full
  flex-col
  gap-3
  overflow-y-scroll
  bg-back-color
  py-[22px]
  px-[18px]
`;

//#endregion

const NotificationLayer = () => {
  const { refreshUser } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { handleScroll, isReachingEnd } = useScroll();

  const queryClient = useQueryClient();

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

  const { mutate: patchNotificationRead } = useMutation({
    mutationFn: (notification: INotification) => {
      return api.put(`/api/notification/${notification.id}/read`);
    },
    onSuccess: () => queryClient.invalidateQueries(['notification']),
  });

  const handleRead = (notification: INotification) => {
    if (!notification.read) {
      // TODO: notification.targetId에 따라 페이지 이동
      console.log(notification.targetId);
      patchNotificationRead(notification);
    }
  };

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

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
                <NotificationListItem
                  notification={notification}
                  onClick={() => handleRead(notification)}
                />
              </Fragment>
            )),
          )}
        </NotificationList>
      </Wrapper>
    </Layer>
  );
};

export default NotificationLayer;
