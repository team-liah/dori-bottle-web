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
    id: 'rental',
    title: 'FAQ',
    children: <FaqTab />,
  },
  {
    id: 'return',
    title: '1:1 문의하기',
    children: <InquiryTab />,
  },
];

const FaqLayer = () => {
  return (
    <Layer title="문의하기" fullScreen={true}>
      <Wrapper>
        <Tab tabs={guideTabs} />
      </Wrapper>
    </Layer>
  );
};

export default FaqLayer;
