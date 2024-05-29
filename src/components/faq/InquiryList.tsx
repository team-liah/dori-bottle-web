import React, { Fragment, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import InquiryListItem from './InquiryListItem';
import Error from '../common/Error';
import * as Custom from '@/components/common/CustomStyledComponent';
import useScroll from '@/hooks/useScroll';
import { useInfiniteInquirys } from '@/types/inquiry';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

const FaqList = tw.div`
  flex
  h-[calc(100dvh-250px)]
  w-full
  flex-col
  overflow-y-scroll
`;

//#endregion

const InquiryList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { handleScroll, isReachingEnd } = useScroll();

  const { data, isLoading, error, fetchNextPage } = useInfiniteInquirys();

  useEffect(() => {
    if (isReachingEnd) {
      fetchNextPage();
    }
  }, [fetchNextPage, isReachingEnd]);

  return (
    <FaqList
      ref={scrollRef}
      onScroll={() => scrollRef.current && handleScroll(scrollRef.current)}
    >
      <Custom.Divider />
      {isLoading && <Custom.ProgressBar />}
      {!!error && <Error message={getErrorMessage(error)} />}
      {data?.pages[0].content.length === 0 && (
        <Custom.Empty>등록된 질문이 없어요</Custom.Empty>
      )}
      {data?.pages.map((page) =>
        page.content.map((inquiry) => (
          <Fragment key={inquiry.id}>
            <InquiryListItem inquiry={inquiry} />
            <Custom.Divider />
          </Fragment>
        )),
      )}
    </FaqList>
  );
};

export default InquiryList;
