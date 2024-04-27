import React from 'react';
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
  flex-col
  bg-[#F2F3F8]
  p-5
  pl-10
`;

const BulletText = tw.li`
  text-[11px]
  font-normal
  leading-[22px]
  tracking-[-0.36px]
  text-gray2
`;

//#endregion

const CpointJoinRequire = () => {
  return (
    <>
      <Title>
        {'탄소중립실천포인트 참여를 위한\n본인인증이 완료되었습니다.'}
      </Title>
      <SubTitle>
        {
          '한국환경공단의 탄소중립실천포인트 가입여부 확인 후\n연동이 완료됩니다.'
        }
      </SubTitle>
      <ButtonWrapper>
        <a
          className="w-full"
          href="https://www.cpoint.or.kr/netzero/main.do"
          target="_blank"
          rel="noreferrer"
        >
          <Custom.Button type="button" className="whitespace-pre-line">
            {'탄소중립실천포인트 회원가입'}
          </Custom.Button>
        </a>
      </ButtonWrapper>
      <BulletTextContainer className=" bg-transparent py-[4px]">
        <BulletText>
          ※ 탄소중립실천포인트에 이미 가입되어 있으신 경우 자동으로 연동됩니다.
        </BulletText>
        <BulletText>
          ※ 가입여부 확인 및 포인트 연동은 약 3~5영업일 소요됩니다.
        </BulletText>
      </BulletTextContainer>
    </>
  );
};

export default CpointJoinRequire;
