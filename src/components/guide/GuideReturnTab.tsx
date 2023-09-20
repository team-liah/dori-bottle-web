import React from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import tw from 'tailwind-styled-components';
import GuideTextItem from './GuideTextItem';
import * as Custom from '@/components/common/CustomStyledComponent';

//#region Styled Component

const Wrapper = tw(Custom.TabWrapper)`
  gap-8
`;

const BottomWrapper = tw.div`
  mt-8
  flex
  flex-row
  items-center
  justify-center
  gap-2
`;

const BubbleWrapper = tw.div`
  flex
  items-center
  justify-center
`;

const BubbleText = tw.div`
  rounded-full
  bg-main-blue
  px-[50px]
  py-5
  text-[20px]
  font-bold
  leading-[20px]
  text-white
`;

const Edge = tw(BsTriangleFill)`
  text-main-blue
  translate-x-[-4px]
  rotate-90
`;

const Icon = tw.img`
  w-[99px]
  scale-x-[-1]
`;

//#endregion

const guideItemList = [
  {
    id: 1,
    title: '도리보틀 수거함 발견!',
    image: (
      <img src="/assets/guide/return1.png" className="h-[110px]" alt="guide" />
    ),
  },
  {
    id: 2,
    title: '컵 하단을\n수거함 리더기에 태그하기',
    image: (
      <img src="/assets/guide/return2.png" className="h-[100px]" alt="guide" />
    ),
  },
  {
    id: 3,
    title: '수거함 투입구 열림',
    image: (
      <img src="/assets/guide/return3.png" className="h-[110px]" alt="guide" />
    ),
  },
  {
    id: 4,
    title: '컵 뚜껑을 닫은 후\n수거함에 투입',
    image: (
      <img src="/assets/guide/return4.png" className="h-[100px]" alt="guide" />
    ),
  },
];

const GuideReturnTab = () => {
  return (
    <Wrapper>
      {guideItemList.map((item) => (
        <GuideTextItem key={item.id} {...item} />
      ))}
      <BottomWrapper>
        <BubbleWrapper>
          <BubbleText>반납완료 !</BubbleText>
          <Edge />
        </BubbleWrapper>
        <Icon src="/assets/Character.png" />
      </BottomWrapper>
    </Wrapper>
  );
};

export default GuideReturnTab;
