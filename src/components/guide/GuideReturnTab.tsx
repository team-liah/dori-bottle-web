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
    title: '수거함으로 이동',
  },
  {
    id: 2,
    title: '컵 하단 수거함 리더기에 태그',
  },
  {
    id: 3,
    title: '투입구 열림',
  },
  {
    id: 4,
    title: '컵 뚜껑 닫고 수거함에 투입',
  },
  {
    id: 5,
    title: '반납 완료!',
  },
];

const GuideReturnTab = () => {
  return (
    <Wrapper>
      {guideItemList.map((item) => (
        <GuideTextItem key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};

export default GuideReturnTab;
