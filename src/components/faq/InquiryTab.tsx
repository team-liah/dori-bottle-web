import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import InquiryList from './InquiryList';
import * as Custom from '@/components/common/CustomStyledComponent';

//#region Styled Component

const Wrapper = tw.div`
  h-full
  flex
  w-full
  flex-col
  justify-between
`;

const ButtonWrapper = tw.div`
  flex
  p-5
`;

//#endregion

const InquiryTab = () => {
  const router = useRouter();

  const handleClickCreate = () => {
    router.push('/faq', '/faq/inquiry/create', { shallow: true });
  };

  return (
    <Wrapper>
      {router.asPath === '/faq/inquiry/create' ? (
        <div>CREATE</div>
      ) : (
        <>
          <InquiryList />
          <ButtonWrapper>
            <Custom.Button onClick={handleClickCreate}>문의하기</Custom.Button>
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default InquiryTab;
