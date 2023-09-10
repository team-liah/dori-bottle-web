import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoArrowForward } from 'react-icons/io5';
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
  justify-between
  pt-[64px]
  px-[28px]
  relative
  pb-[0px]
`;

const BubbleWrapper = tw.div`
  flex
  w-full
  cursor-pointer
  items-center
  justify-center
  gap-4
  rounded-[25px]
  bg-white
  py-[40px]
  shadow-[0_0_8px_0px_rgba(17,17,17,0.12)]
`;

const BubbleIcon = tw.img`
  h-[50px]
  w-[50px]
`;

const ButtonWrapper = tw.div`
  my-[22px]
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

const FullLink = tw(Link)`
  flex-1
  w-full
`;

const HistoryButton = tw(Custom.Button)`
  bg-point-yellow
`;

const QrButton = tw(SquareButton)`
  w-full
  bg-[#F2F3F8]
  shadow-[0_0_6px_0px_rgba(17,17,17,0.12)]
  mb-8
  py-4
`;

const Name = tw.div`
  mb-4
  w-full
  text-left
  text-[20px]
  font-medium
  tracking-[-0.6px]
  text-white
`;

const BubbleText = tw.span`
  text-[30px]
  font-bold
  text-gray1
`;

const BottomContainer = tw.div`
  flex
  w-screen
  flex-row
  items-center
  justify-between
  bg-[#E2EFFF]
  py-7
  px-5
`;

const GuideButton = tw.div`
  flex
  flex-row
  items-center
`;

const GuideText = tw.div`
  text-[13px]
  font-bold
  text-main-blue
  underline
`;

const ArrowIcon = tw(IoArrowForward)`
  text-main-blue
  w-[16px]
  h-[16px]
`;

const InfoText = tw.div`
  whitespace-pre-line
  break-words
  text-center
  text-[14px]
  font-medium
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

  const [infoText, setInfoText] = useState<string>('');

  const openQrcode = () => {
    openModal({
      component: QrcodeModal,
    });
  };

  const getInfoText = () => {
    const random = Math.floor(Math.random() * 3);
    switch (random) {
      case 0:
        return '홈화면에 도리보틀을 추가하면\n더 편하게 이용할 수 있어요!';
      case 1:
        return '친구를 초대하면 버블을\n계속 모을 수 있어요!';
      case 2:
        return '커피믹스 등을 이용하면\n커피값을 절약할 수 있어요!';
      default:
        return '';
    }
  };

  useEffect(() => {
    setInfoText(getInfoText());
  }, []);

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
    <Wrapper
      style={{
        background: 'linear-gradient(180deg, #056BF1 243px, #FFFFFF 100px)',
      }}
    >
      <NavigationBar />

      <Name>{user?.name || '사용자'}님의 버블</Name>
      <BubbleWrapper onClick={() => router.push('/guide')}>
        <BubbleIcon src="/svg/bubble.svg" alt="버블" />
        <BubbleText>
          {(remainBubble?.freePoint ?? 0) + (remainBubble?.payPoint ?? 0)}개
        </BubbleText>
      </BubbleWrapper>
      <ButtonWrapper>
        <FullLink href="/charge">
          <HistoryButton>버블 내역</HistoryButton>
        </FullLink>
        <FullLink href="/charge">
          <Custom.Button>버블 충전하기</Custom.Button>
        </FullLink>
      </ButtonWrapper>
      <QrButton onClick={openQrcode}>
        <img src="/svg/qrcode.svg" className="h-1/2" alt="QR" />
      </QrButton>

      <BottomContainer>
        <img src="/assets/Character.png" className="h-[130px]" alt="QR" />
        <div className="flex flex-col items-end justify-start gap-[30px]">
          <Link href="/guide">
            <GuideButton>
              <GuideText>이용가이드 보러가기</GuideText>
              <ArrowIcon />
            </GuideButton>
          </Link>
          <Link href="/guide">
            <InfoText>{infoText}</InfoText>
          </Link>
        </div>
      </BottomContainer>
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
