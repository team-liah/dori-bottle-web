import React from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';

//#region Styled Component

const Title = tw.div`
  mb-1
  whitespace-pre-line
  text-center
  text-[24px]
  font-bold
  leading-[32px]
  tracking-[-0.72px]
  text-main-text
`;

const Icon = tw.img`
  h-[140px]
`;

const CharacterWrapper = tw.div`
  flex
  flex-col
  items-center
  justify-center
  gap-5
`;

const BubbleText = tw.div`
  relative
  flex
  w-[280px]
  items-center
  justify-center
  whitespace-pre-line
  rounded-[28px]
  bg-[#F5F5F5]
  py-5
  text-center
  text-[16px]
  font-bold
  leading-[22px]
  tracking-[-0.48px]
  text-gray1
`;

const Edge = tw(BsTriangleFill)`
  text-[#F5F5F5]
  translate-x-[-4px]
  rotate-180
  bottom-0
  absolute
  translate-y-[80%]
`;

const ButtonWrapper = tw.div`
  flex
  w-full
  flex-row
  justify-center
  gap-3
  px-10
`;

//#endregion

const CpointLinkComplete = () => {
  return (
    <>
      <Title>{'탄소중립실천포인트 연동이\n완료되었습니다.'}</Title>
      <CharacterWrapper>
        <BubbleText>
          <span>
            컵을 꼭 반납 하고
            <span className="text-main-blue">{'\n'}300원</span> 환급받으세요!
          </span>
          <Edge />
        </BubbleText>
        <Icon src="/assets/character-wink.png" />
      </CharacterWrapper>
      <ButtonWrapper>
        <a
          className="w-full"
          href="https://www.cpoint.or.kr/netzero/main.do"
          target="_blank"
          rel="noreferrer"
        >
          <Custom.Button type="button" className="whitespace-pre-line">
            {'탄소중립실천포인트바로가기'}
          </Custom.Button>
        </a>
      </ButtonWrapper>
    </>
  );
};

export default CpointLinkComplete;
