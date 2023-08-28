import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import NavigationBar from '@/components/main/NavigationBar';
import QrcodeModal from '@/components/main/QrcodeModal';
import useAuth from '@/hooks/useAuth';
import useInstalltaion from '@/hooks/useInstallation';
import useModals from '@/hooks/useModals';
import { fetcher, serverFetcher } from '@/service/fetch';
import { IRemainPoint } from '@/types/point';

//#region Styled Components
const Wrapper = tw(Custom.MobileWrapper)`
  flex
  flex-col
  items-center
  pt-[64px]
`;

const GuideButton = tw.div`
  flex
  h-[50px]
  w-full
  cursor-pointer
  items-center
  justify-center
  rounded-[16px]
  bg-white
  shadow-[0_0_11px_0px_rgba(17,17,17,0.15)]
`;

const LabelText = tw.div`
  text-center
  text-[16px]
  font-bold
  text-gray2
`;

const ArrowIcon = tw(FiArrowRight)`
  w-[20px]
  h-[20px]
  text-gray2
  ml-1
`;

const ContentWrapper = tw.div`
  mt-auto
  flex
  w-full
  flex-col
  gap-5
`;

const ButtonWrapper = tw.div`
  flex
  w-full
  flex-row
  gap-4
`;

const SquareButton = tw.div`
  flex
  h-[180px]
  basis-1/2
  flex-col
  items-center
  justify-center
  rounded-[16px]
  `;

const BubbleButton = tw(SquareButton)`
  bg-white
  px-[14px]
  pt-5
  pb-[14px]
  shadow-[0_0_11px_0px_rgba(17,17,17,0.15)]
`;

const QrButton = tw(SquareButton)`
  bg-[#8A8A8A]
`;

const Name = tw.span`
  text-[16px]
  font-medium
  tracking-[-0.8px]
  text-gray1  
`;

const BubbleText = tw.span`
  text-[26px]
  font-bold
  text-gray1
`;
//#endregion

export default function Home() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const { openModal } = useModals();
  const { handleBeforeInstallPrompt } = useInstalltaion();
  const { data: remainBubble } = useQuery<IRemainPoint>({
    queryKey: ['point', 'remain-point'],
    queryFn: () => fetcher('/api/point/remain-point'),
  });

  const openQrcode = () => {
    openModal({
      component: QrcodeModal,
    });
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, [handleBeforeInstallPrompt]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <Wrapper>
      <NavigationBar />
      <GuideButton onClick={() => router.push('/guide')}>
        <LabelText>도리보틀 이용가이드 📖</LabelText>
        <ArrowIcon />
      </GuideButton>
      <ContentWrapper>
        <ButtonWrapper>
          <BubbleButton>
            <Name>{user?.name || '사용자'}님의 버블</Name>
            <BubbleText>
              {(remainBubble?.freePoint ?? 0) + (remainBubble?.payPoint ?? 0)}개
            </BubbleText>
            <img src="/svg/bubble.svg" alt="버블" />
          </BubbleButton>
          <QrButton onClick={openQrcode}>
            <img src="/svg/qrcode.svg" alt="QR" />
          </QrButton>
        </ButtonWrapper>
        <Link href="/charge">
          <Custom.Button>버블 충전하기</Custom.Button>
        </Link>
      </ContentWrapper>
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery(['me'], () =>
      serverFetcher('/me', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${context.req.cookies.access_token}`,
          'Content-Type': 'application/json',
        },
      }),
    );

    return {
      props: {
        dehydratedProps: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
