import { useRouter } from 'next/router';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import useAuth from '@/hooks/useAuth';

//#region Styled Component

const Wrapper = tw.div`
  h-full
  flex
  w-full
  flex-col
  items-center
  px-[48px]
  pt-[132px]
`;

const Title = tw.div`
  mb-[40px]
  w-full
  whitespace-pre-line
  text-center
  text-[24px]
  leading-[35px]
  text-gray1
`;

const ContentWrapper = tw.div`
  flex
  w-full
  flex-col
  gap-10
`;

const BubbleImage = tw.img`
  mx-auto
  h-[80px]
  w-[80px]
`;

const ButtonImage = tw.img`
  mr-2
  h-[24px]
  w-[24px]
`;

const ContentText = tw.div`
  mb-[75px]
  whitespace-pre-line
  text-center
  text-[16px]
  leading-[28px]
  tracking-[-0.54px]
  text-gray1
`;

const ButtonWrapper = tw.div`
  flex
  w-full
  flex-col
  gap-3
`;

const PaymentButton = tw(Custom.Button)`
  flex
  flex-row
  items-center
  justify-center
  leading-[25px]
`;

const InviteButton = tw(Custom.Button)`
  flex
  flex-row
  items-center
  justify-center
  bg-point-yellow
`;

const ButtonText = tw.div`
  relative
  h-[22px]
`;

const ArrowIcon = tw(FiArrowRight)`
  w-[20px]
  h-[20px]
  text-white
  ml-1
`;

const LaterButton = tw.div`
  mt-20
  text-[13px]
  font-medium
  tracking-[-0.36px]
  text-unactivated
  underline
`;

const LabelText = tw.div`
  pointer-events-none
  absolute
  top-[35px]
  left-[20px]
  h-[50px]
  w-[124px]
  translate-x-[-90%]
  bg-[url(/svg/tooltip_blue.svg)]
  bg-no-repeat
  px-3
  pt-[18px]
  text-left
  text-[12px]
  font-bold
  text-main-blue
`;

//#endregion

export default function Complete() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <Wrapper>
      <Title>
        <b>{`${user?.name}님 환영합니다!`}</b>
      </Title>
      <ContentWrapper>
        <BubbleImage src="/svg/bubble.svg" alt="next" />
        <ContentText>
          <b className="text-main-blue">웰컴버블 20개</b>
          {'를 드렸어요.\n'}
          {'결제수단 등록 후\n'}
          {'바로 이용해보세요!'}
        </ContentText>
      </ContentWrapper>
      <ButtonWrapper>
        <PaymentButton onClick={() => router.push('/payment')}>
          <ButtonImage src="/svg/card_blue.svg" />
          <ButtonText>결제수단 등록하기</ButtonText>
          <ArrowIcon />
        </PaymentButton>
        <InviteButton
          onClick={() =>
            router.replace({
              pathname: '/invite/register',
              query: router.query,
            })
          }
        >
          <ButtonImage src="/svg/invite_yellow.svg" />
          <ButtonText>
            초대코드 입력하기
            <LabelText>버블 10개 추가 증정</LabelText>
          </ButtonText>
          <ArrowIcon />
        </InviteButton>
      </ButtonWrapper>
      <LaterButton onClick={() => router.push('/')}>나중에 할게요</LaterButton>
    </Wrapper>
  );
}
