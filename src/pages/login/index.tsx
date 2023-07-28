import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import api from '@/service/api';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component
const Wrapper = tw(Custom.MobileWrapper)`
  flex
  flex-col
  items-center
  justify-between
  pt-[64px]
`;

const TopContainer = tw.div`
  flex
  w-[90%]
  flex-col
  gap-8
`;
const LabelText = tw.div`
  w-full
  rounded-[16px]
  bg-white
  px-3
  py-2
  text-center
  text-[14px]
  font-bold
  text-point-yellow
  shadow-[0_0_8px_0px_rgba(255,177,32,0.50)]
`;

const LinkWrapper = tw(Link)`
  w-full
`;

const BottomContainer = tw.div`
  flex
  w-full
  flex-col
  gap-4
`;

const TestLoginButton = tw(Custom.Button)`
  bg-unactivated
`;

//#endregion

export default function Login() {
  const router = useRouter();

  const callbackUrl = router.query.callbackUrl as string;

  const handleTestLogin = async () => {
    try {
      await api.post('/api/account/dummy-auth');
      router.push('/');
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  return (
    <Wrapper>
      <TopContainer>
        <img src="/svg/text_logo.svg" alt="Dori Bottle" />
        <LabelText>지금 회원가입하고 무료 이용권 받으세요 🎉</LabelText>
      </TopContainer>
      <BottomContainer>
        <TestLoginButton onClick={handleTestLogin}>
          테스트 로그인
        </TestLoginButton>
        <LinkWrapper
          href={`/login/confirmation${
            callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''
          }`}
        >
          <Custom.Button>휴대폰번호로 시작하기</Custom.Button>
        </LinkWrapper>
      </BottomContainer>
    </Wrapper>
  );
}
