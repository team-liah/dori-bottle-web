import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import FaqTab from './FaqTab';
import InquiryTab from './InquiryTab';
import Layer from '@/components/common/Layer';
import Tab from '@/components/common/Tab';
import { ITab } from '@/types/common';

//#region Styled Component

const Wrapper = tw.div`
  pt-6
`;
//#endregion

const guideTabs: ITab[] = [
  {
    id: 'faq',
    title: 'FAQ',
    children: <FaqTab />,
  },
  {
    id: 'inquiry',
    title: '1:1 문의하기',
    children: <InquiryTab />,
  },
];

const FaqLayer = () => {
  const router = useRouter();

  return (
    <Layer
      title="문의하기"
      fullScreen={true}
      onClickBack={() => router.replace('/')}
    >
      <Wrapper>
        <Tab tabs={guideTabs} tabStyle="underline" />
      </Wrapper>
    </Layer>
  );
};

export default FaqLayer;
