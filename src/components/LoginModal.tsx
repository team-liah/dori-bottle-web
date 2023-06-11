import useModals from '@/hooks/useModals';
import { signIn } from 'next-auth/react';
import React from 'react';
import tw from 'tailwind-styled-components';

interface ILoginModalProps {}

//#region Styled Component

const Wrapper = tw.div`
  w-full pt-[50px] flex flex-col gap-3`;

//#endregion

const LoginModal = (props: ILoginModalProps) => {
  const { openModal } = useModals();
  return (
    <Wrapper>
      <button className="bg-yellow" onClick={() => signIn('kakao')}>
        카카오로 로그인
      </button>
      <button className="bg-green" onClick={() => signIn('naver')}>
        네이버로 로그인
      </button>
      <button className="bg-gray-light" onClick={() => openModal(<div>ㄱㄷ 만드는 중</div>)}>
        휴대폰번호로 시작하기
      </button>
    </Wrapper>
  );
};

export default LoginModal;
