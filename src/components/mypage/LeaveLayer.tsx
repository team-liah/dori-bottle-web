import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-col
  items-center
  gap-7
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
  w-full
  whitespace-pre-line
  text-[14px]
  font-normal
  leading-[22px]
  tracking-[-0.42px]
  text-gray1
`;

const Icon = tw.img`
  h-[140px]
`;

const BulletTextContainer = tw.ul`
  w-full
  list-inside
  list-disc
  rounded-[15px]
  bg-back-color
  px-8
  py-4
`;

const BulletText = tw.li`
  text-[12px]
  font-normal
  leading-[22px]
  tracking-[-0.36px]
  text-gray2
`;

const ButtonWrapper = tw.div`
  flex
  w-full
  flex-row
  gap-2
`;

//#endregion

const LeaveLayer = () => {
  const router = useRouter();

  return (
    <Layer
      title="탈퇴하기"
      scrollable={true}
      footer={
        <ButtonWrapper>
          <Custom.Button type="submit" $style="disable">
            다음
          </Custom.Button>
          <Custom.Button type="button" onClick={() => router.push('/')}>
            홈으로
          </Custom.Button>
        </ButtonWrapper>
      }
    >
      <Wrapper>
        <Title>도리보틀을 떠나시는 건가요..?</Title>
        <Icon src="/assets/character-crying.png" />
        <SubTitle>
          탈퇴 시 다음의 정보가 모두 삭제되며, 삭제된 정보는 복구가 불가합니다.
        </SubTitle>
        <BulletTextContainer>
          <BulletText>회원 정보</BulletText>
          <BulletText>보유한 버블 및 결제 정보</BulletText>
          <BulletText>이벤트 혜택 정보</BulletText>
          <BulletText>서비스 이용 및 활동 이력 정보</BulletText>
        </BulletTextContainer>
        <div className="flex flex-col gap-2">
          <SubTitle>
            회원 탈퇴 후{' '}
            <b className="text-main-blue">3개월간 재가입이 불가합니다.</b>
          </SubTitle>
          <SubTitle>
            3개월 이후 가입이 가능하며 재가입이 아닌 신규 회원으로 가입됩니다.
            탈퇴를 진행하시겠습니까?
          </SubTitle>
        </div>
      </Wrapper>
    </Layer>
  );
};

export default LeaveLayer;
