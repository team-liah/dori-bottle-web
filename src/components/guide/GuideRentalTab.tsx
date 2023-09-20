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
  bg-point-yellow
  px-[50px]
  py-5
  text-[20px]
  font-bold
  leading-[20px]
  text-white
`;

const Edge = tw(BsTriangleFill)`
  text-point-yellow
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
    title: '어플에서 QR이용권 터치하기',
    image: (
      <img src="/assets/guide/rental1.png" className="h-[130px]" alt="guide" />
    ),
  },
  {
    id: 2,
    title: '자판기 리더기에\n어플 QR이용권 태그하기',
    image: (
      <img src="/assets/guide/rental2.png" className="h-[116px]" alt="guide" />
    ),
  },
  {
    id: 3,
    title: '자판기 화면에서 컵 선택',
    image: (
      <img
        src="/assets/guide/rental3.png"
        className="mb-4 h-[92px]"
        alt="guide"
      />
    ),
  },
  {
    id: 4,
    title: '자판기 투출구에서\n컵 가져가기',
    image: (
      <img src="/assets/guide/rental4.png" className="h-[100px]" alt="guide" />
    ),
  },
];

const GuideRentalTab = () => {
  return (
    <Wrapper>
      {guideItemList.map((item) => (
        <GuideTextItem key={item.id} {...item} />
      ))}
      <BottomWrapper>
        <BubbleWrapper>
          <BubbleText>대여완료 !</BubbleText>
          <Edge />
        </BubbleWrapper>
        <Icon src="/assets/Character.png" />
      </BottomWrapper>
    </Wrapper>
  );
};

export default GuideRentalTab;
