import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { FiArrowRight } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import NavigationBar from '@/components/main/NavigationBar';
import QrcodeModal from '@/components/main/QrcodeModal';
import useAuth from '@/hooks/useAuth';
import useModals from '@/hooks/useModals';
import useToast from '@/hooks/useToast';
import { fetcher } from '@/service/fetch';
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
  h-[20px]
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
  const { user } = useAuth();
  const { openToast } = useToast();
  const { openModal } = useModals();
  const { data: remainBubble } = useQuery<IRemainPoint>({
    queryKey: ['point', 'remain-point'],
    queryFn: () => fetcher('/api/point/remain-point'),
  });

  const openPreparingToast = () => {
    openToast({
      component: '준비 중입니다.',
    });
  };

  const openQrcode = () => {
    openModal({
      component: QrcodeModal,
    });
  };

  return (
    <Wrapper>
      <NavigationBar />
      <GuideButton onClick={openPreparingToast}>
        <LabelText>도리보틀 이용가이드 📖</LabelText>
        <ArrowIcon />
      </GuideButton>
      <ContentWrapper>
        <ButtonWrapper>
          <BubbleButton>
            <Name>{user?.name}님의 버블</Name>
            <BubbleText>
              {(remainBubble?.freePoint ?? 0) + (remainBubble?.payPoint ?? 0)}개
            </BubbleText>
            <img src="/svg/bubble.svg" alt="버블" />
          </BubbleButton>
          <QrButton onClick={openQrcode}>
            <img src="/svg/qrcode.svg" alt="QR" />
          </QrButton>
        </ButtonWrapper>
        <Custom.Button onClick={openPreparingToast}>
          버블 충전하기
        </Custom.Button>
      </ContentWrapper>
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery(['me'], () => fetcher('/api/me'));

    return {
      props: {
        dehydratedProps: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
};
