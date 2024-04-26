import React from 'react';
import tw from 'tailwind-styled-components';
import GuidePolicyTab from './GuidePolicyTab';
import GuideRentalTab from './GuideRentalTab';
import GuideReturnTab from './GuideReturnTab';
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
    title: '대여',
    children: <GuideRentalTab />,
  },
  {
    id: 'return',
    title: '반납',
    children: <GuideReturnTab />,
  },
  {
    id: 'policy',
    title: '이용규정',
    children: <GuidePolicyTab />,
  },
];

const GuideLayer = () => {
  return (
    <Layer title="이용방법" fullScreen={true}>
      <Wrapper>
        <Tab tabs={guideTabs} />
      </Wrapper>
    </Layer>
  );
};

export default GuideLayer;
