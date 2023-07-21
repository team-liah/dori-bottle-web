import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import { fetcher } from '@/service/fetch';
import { IProfile } from '@/types/user';

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
  text-[24px]
  leading-[35px]
  text-gray1
`;

const ContentWrapper = tw.div`
  flex
  w-full
  flex-col
  gap-[10px]
`;

const BubbleImage = tw.img`
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
  text-[16px]
  text-gray1
`;

const ButtonWrapper = tw.div`
  flex
  w-full
  flex-col
  gap-[10px]
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
  h-[22px]
`;

const ArrowIcon = tw(FiArrowRight)`
  w-[20px]
  h-[20px]
  text-white
  ml-1
`;

const LaterButton = tw.div`
  mt-7
  text-[13px]
  font-medium
  tracking-[-0.65px]
  text-unactivated
  underline
`;

//#endregion

export default function Complete() {
  const router = useRouter();
  const { data: profile } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: () => fetcher('/api/me/profile'),
  });

  if (!profile) return null;

  return (
    <Wrapper>
      <Title>
        <b>{profile.name}</b>
        {'님,\n도리보틀 회원가입을\n축하합니다!'}
      </Title>
      <ContentWrapper>
        <BubbleImage src="/svg/bubble.svg" alt="next" />
        <ContentText>
          {'웰컴버블 10개를 드렸어요\n'}
          <b>{'결제수단 등록'}</b>
          {'하고\n바로 도리보틀을 이용해보세요!'}
        </ContentText>
      </ContentWrapper>
      <ButtonWrapper>
        <PaymentButton onClick={() => router.push('/')}>
          <ButtonImage src="/svg/card_blue.svg" />
          <ButtonText>결제수단 등록하기</ButtonText>
          <ArrowIcon />
        </PaymentButton>
        <InviteButton onClick={() => router.push('/')}>
          <ButtonImage src="/svg/invite_yellow.svg" />
          <ButtonText>초대코드 입력하기</ButtonText>
          <ArrowIcon />
        </InviteButton>
      </ButtonWrapper>
      <LaterButton onClick={() => router.push('/')}>나중에 할게요</LaterButton>
    </Wrapper>
  );
}

// TODO: Axios Aggregate Error 원인 파악
// export const getServerSideProps: GetServerSideProps = async () => {
//   const queryClient = new QueryClient();

//   try {
//     await queryClient.prefetchQuery(['profile'], () =>
//       fetcher('/api/me/profile'),
//     );

//     return {
//       props: {
//         dehydratedProps: dehydrate(queryClient),
//       },
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   } finally {
//     queryClient.clear();
//   }
// };
