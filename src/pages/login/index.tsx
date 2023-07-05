import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import Logo from '/public/assets/Logo.png';

//#region Styled Component
const Wrapper = tw(Custom.MobileWrapper)`
  flex
  flex-col
  items-center
  justify-between
  pt-[100px]
`;

const TopContainer = tw.div`
  flex
  w-[90%]
  flex-col
  gap-8
`;

const LogoImage = tw(Image)`
  w-full
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

//#endregion

export default function Login() {
  const router = useRouter();

  const callbackUrl = router.query.callbackUrl as string;

  return (
    <Wrapper>
      <TopContainer>
        <LogoImage alt="Dori Bottle" src={Logo} />
        <LabelText>지금 회원가입하고 무료 이용권 받으세요 🎉</LabelText>
      </TopContainer>
      <LinkWrapper
        href={`/login/confirmation${
          callbackUrl && `?callbackUrl=${encodeURIComponent(callbackUrl)}`
        }`}
      >
        <Custom.Button>휴대폰번호로 시작하기</Custom.Button>
      </LinkWrapper>
    </Wrapper>
  );
}
