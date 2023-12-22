import React from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-col
  items-center
  gap-5
  pt-10
`;

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

const BulletTextContainer = tw.ul`
  mt-5
  flex
  w-full
  list-outside
  list-disc
  flex-col
  gap-1
  px-5
`;

const BulletText = tw.li`
  text-[12px]
  font-normal
  leading-[22px]
  tracking-[-0.36px]
  text-gray2
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

const PolicyWrapper = tw.div`
  mt-2
  flex
  w-full
  flex-col
  gap-1
  text-[12px]
  font-medium
  leading-[22px]
  tracking-[-0.36px]
  text-gray2
`;

//#endregion
const CpointLayer = () => {
  const bulletList = [
    <p>탄소중립포인트제 사이트에 가입하면 자동으로 도리보틀과 연동됩니다.</p>,
    <p>
      인센티브 지급 주체는 한국환경공단으로, 인센티브는 탄소중립포인트제 기준에
      따라 익월 말 지급되며 한국환경공단 사정에 따라 변경될 수 있습니다.
    </p>,
    <p>
      인센티브 적립 내역 및 세부내용은 탄소중립포인트제 사이트에서 확인이
      가능합니다.
    </p>,
    <p>
      탄소중립포인트제 운영에 관한 규정(환경부 고시 제2022-109호)에 따라
      운영됩니다.
    </p>,
  ];

  return (
    <Layer
      title="탄소중립포인트제"
      scrollable={true}
      footer={
        <a
          href="https://www.cpoint.or.kr/netzero/main.do"
          target="_blank"
          rel="noreferrer"
        >
          <Custom.Button type="submit">탄소중립포인트제 참여하기</Custom.Button>
        </a>
      }
    >
      <Wrapper>
        <Title>탄소중립포인트제가 무엇인가요?</Title>
        <SubTitle>
          {
            '친환경활동에 참여하는 국민에게 이용실적에 따라\n인센티브를 지원하는 제도에요.'
          }
        </SubTitle>
        <CharacterWrapper>
          <BubbleText>
            {'도리보틀 컵을 반납하면\n200원이 지급돼요!'}
            <Edge />
          </BubbleText>
          <Icon src="/assets/character-wink.png" />
        </CharacterWrapper>
        <PolicyWrapper>
          [유의사항]
          <BulletTextContainer>
            {bulletList?.map((bullet, index) => (
              <BulletText key={index}>{bullet}</BulletText>
            ))}
          </BulletTextContainer>
        </PolicyWrapper>
      </Wrapper>
    </Layer>
  );
};

export default CpointLayer;
