import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import FaqListItem from './FaqListItem';
import Error from '../common/Error';
import * as Custom from '@/components/common/CustomStyledComponent';
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
`;

const FaqList = tw.div`
  flex
  h-[calc(100dvh-150px)]
  w-full
  flex-col
  overflow-y-scroll
`;

//#endregion

const FaqTab = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { handleScroll, isReachingEnd } = useScroll();

  const { data, isLoading, error, fetchNextPage } =
    useInfiniteQuery<INoticeList>({
      queryKey: ['faq'],
      queryFn: ({ pageParam = 0 }) =>
        fetcher('/api/post?type=FAQ', {
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
    <Wrapper>
      <FaqList
        ref={scrollRef}
        onScroll={() => scrollRef.current && handleScroll(scrollRef.current)}
      >
        <Custom.Divider />
        {isLoading && <Custom.ProgressBar />}
        {!!error && <Error message={getErrorMessage(error)} />}
        {data?.pages[0].content.length === 0 && (
          <Custom.Empty>자주 묻는 질문이 없어요</Custom.Empty>
        )}
        {data?.pages.map((page) =>
          page.content.map((faq) => (
            <Fragment key={faq.id}>
              <FaqListItem faq={faq} />
              <Custom.Divider />
            </Fragment>
          )),
        )}
      </FaqList>
    </Wrapper>
  );
};

export default FaqTab;
