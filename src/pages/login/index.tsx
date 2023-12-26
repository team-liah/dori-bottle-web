import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
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
  pt-[80px]
  bg-main-blue
`;

const TextWrapper = tw.div`
  flex
  flex-col
  items-center
  justify-center
`;
const MainText = tw.div`
  text-center
  font-jalnan
  text-[50px]
  font-bold
  text-white
  drop-shadow-main
`;

const MainSubText = tw.div`
  text-center
  font-jalnan
  text-[20px]
  font-bold
  text-white
  drop-shadow-main
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
const LoginButton = tw(Custom.Button)`
  bg-white
  text-main-blue
  font-bold
  relative
`;

const LabelText = tw.div`
  pointer-events-none
  absolute
  top-[-35px]
  left-[20px]
  h-[50px]
  w-[200px]
  bg-[url(/svg/tooltip_yellow.svg)]
  bg-no-repeat
  px-3
  pt-[7px]
  text-left
  text-[12px]
  font-bold
  text-point-yellow
`;

const LogoWrapper = tw.div`
  relative
  flex
  w-full
  items-center
  justify-center
  bg-white
`;

const BackgroundImage = tw.img`
  absolute
  h-[35dvh]
`;

const CharacterImage = tw.img`
  absolute
  h-[22dvh]
`;

//#endregion

export default function Login() {
  const router = useRouter();

  // TODO: 테스트 로그인 버튼 삭제
  const handleTestLogin = async () => {
    try {
      const response = await api.post('/api/account/dummy-auth');
      const { accessToken, refreshToken } = response.data;
      document.cookie = `access_token=${accessToken}; path=/;`;
      document.cookie = `refresh_token=${refreshToken}; path=/;`;

      router.push('/');
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  return (
    <Fragment>
      <Head>
        <meta name="theme-color" content="#056BF1" />
      </Head>
      <Wrapper>
        <TextWrapper>
          <MainSubText>손쉬운 얼음라이프</MainSubText>
          <MainText>도리보틀</MainText>
        </TextWrapper>
        <LogoWrapper>
          <BackgroundImage src="/svg/main.svg" alt="next" />
          <CharacterImage src="/assets/character-default.png" alt="next" />
        </LogoWrapper>
        <BottomContainer>
          <TestLoginButton onClick={handleTestLogin}>
            테스트 로그인
          </TestLoginButton>
          <LinkWrapper
            href={{
              pathname: '/login/confirmation',
              query: router.query,
            }}
          >
            <LoginButton>
              <LabelText>🎉 가입하고 무료이용권 받자!</LabelText>
              휴대폰번호로 시작하기
            </LoginButton>
          </LinkWrapper>
        </BottomContainer>
      </Wrapper>
    </Fragment>
  );
}
