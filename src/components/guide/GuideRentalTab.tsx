import React from 'react';
import tw from 'tailwind-styled-components';
import GuideTextItem from './GuideTextItem';
import * as Custom from '@/components/common/CustomStyledComponent';

//#region Styled Component

const Wrapper = tw(Custom.TabWrapper)`
  gap-[10px]
`;

//#endregion

const guideItemList = [
  {
    id: 1,
    title: '자판기로 이동',
  },
  {
    id: 2,
    title: '어플 입장 / QR 이용권 활성화',
  },
  {
    id: 3,
    title: '자판기 리더기에 QR 입력',
  },
  {
    id: 4,
    title: '자판기 화면에서 컵 선택',
  },
  {
    id: 5,
    title: '투출구에서 컵 가져가기',
  },
  {
    id: 6,
    title: '대여 완료!',
  },
];

const GuideRentalTab = () => {
  return (
    <Wrapper>
      {guideItemList.map((item) => (
        <GuideTextItem key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};

export default GuideRentalTab;
