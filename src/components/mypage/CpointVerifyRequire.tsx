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

const SubTitle = tw.div`
  whitespace-pre-line
  text-center
  text-[14px]
  leading-[22px]
  tracking-[-0.42px]
  text-gray1
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

const BulletTextContainer = tw.ul`
  flex
  w-full
  list-outside
  list-disc
  flex-col
  gap-1
  bg-[#F2F3F8]
  p-5
  pl-10
`;

const BulletText = tw.li`
  text-[12px]
  font-normal
  leading-[22px]
  tracking-[-0.36px]
  text-gray2
`;

//#endregion

const CpointVerifyRequire = () => {
  return (
    <>
      <Title>탄소중립실천포인트란?</Title>
      <SubTitle>
        {`일상생활에서 친환경활동에 참여하는 국민에게 
            인센티브를 지원하는 제도에요. 적립된 포인트는 
            계좌로 환급하여 현금처럼 자유롭게 사용할 수 있어요.`}
      </SubTitle>
      <CharacterWrapper>
        <BubbleText>
          <span>
            도리보틀 이용 후 컵을 <span className="text-main-blue">반납</span>
            하면
            <span className="text-main-blue">{'\n'}300원</span>이 지급돼요!
          </span>
          <Edge />
        </BubbleText>
        <Icon src="/assets/character-wink.png" />
      </CharacterWrapper>
      <ButtonWrapper>
        <Custom.Button className="bg-point-yellow" type="button">
          본인인증
        </Custom.Button>
        <a
          className="w-full"
          href="https://www.cpoint.or.kr/netzero/main.do"
          target="_blank"
          rel="noreferrer"
        >
          <Custom.Button
            type="button"
            className="whitespace-pre-line text-[13px]"
          >
            {'탄소중립실천포인트\n회원가입'}
          </Custom.Button>
        </a>
      </ButtonWrapper>
      <BulletTextContainer className="bg-transparent py-[4px]">
        <BulletText>
          본인인증과 탄소중립실천포인트 회원가입이 모두 필요해요.
        </BulletText>
        <BulletText>
          반드시 도리보틀에 <b>가입한 동일한 번호로</b> 본인인증과 회원가입을
          진행해주세요.
        </BulletText>
      </BulletTextContainer>
    </>
  );
};

export default CpointVerifyRequire;
