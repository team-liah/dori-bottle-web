import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import PaymentCreatModal from '@/components/common/modal/PaymentCreatModal';
import InstallPrompt from '@/components/main/InstallPrompt';
import NavigationBar from '@/components/main/NavigationBar';
import QrcodeErrorModal from '@/components/main/QrcodeErrorModal';
import QrcodeModal from '@/components/main/QrcodeModal';
import SlickBanner from '@/components/main/SlickBanner';
import MapModal from '@/components/main/map/MapModal';
import { ERROR_MESSAGE } from '@/constants/ErrorMessage';
import useAuth from '@/hooks/useAuth';
import useModals from '@/hooks/useModals';
import useOneSignal from '@/hooks/useOneSignal';
import useToast from '@/hooks/useToast';
import { fetcher } from '@/service/fetch';
import { myLocationState } from '@/states/MyLocationState';
import { useBanners } from '@/types/banner';
import { IRemainPoint } from '@/types/point';
import { getErrorMessage } from '@/utils/error';

//#region Styled Components
const Wrapper = tw(Custom.MobileWrapper)`
  flex
  flex-col
  items-center
  justify-evenly
  pt-[1.5rem]
  px-[1.75rem]
  gap-3
  relative
  pb-[10vh]
`;

const ColorBg = tw.div`
  absolute
  top-0
  h-[30%]
  w-full
  bg-main-blue
`;

const BubbleWrapper = tw.div`
  relative
  flex
  w-full
  cursor-pointer
  items-center
  justify-center
  gap-4
  rounded-[25px]
  bg-white
  py-[4vh]
  shadow-[0_0_8px_0px_rgba(17,17,17,0.12)]
`;

const BubbleIcon = tw.img`
  h-[50px]
  w-[50px]
`;

const ButtonWrapper = tw.div`
  flex
  w-full
  flex-row
  gap-4
`;

const SquareButton = tw.div`
  flex
  h-[20vh]
  w-full
  basis-1/2
  flex-col
  items-center
  justify-center
  gap-2
  rounded-[25px]
  bg-[#F2F3F8]
  py-4
  shadow-[0_0_6px_0px_rgba(17,17,17,0.12)]
`;

const MapSquareButton = tw(SquareButton)`
  whitespace-pre
  font-bold
  text-gray1
  tracking-[-0.48px]
  flex
  justify-end
  bg-[url(/svg/main_map.svg)]
  bg-no-repeat
  bg-center
  bg-cover
`;

const FullLink = tw(Link)`
  flex-1
  w-full
`;

const HistoryButton = tw(Custom.Button)`
  bg-point-yellow
`;

const Name = tw.div`
  relative
  w-full
  text-left
  text-[3vh]
  font-bold
  tracking-[-0.6px]
  text-white
`;

const BubbleText = tw.span`
  text-[2rem]
  font-bold
  text-gray1
`;

const BottomContainer = tw.div`
  w-full
`;

//#endregion

export default function Home() {
  const { user, refreshUser } = useAuth();
  const { openModal, closeModal } = useModals();
  const { openToast } = useToast();
  const [myLocation, setMyLocation] = useRecoilState(myLocationState);
  const { data: banners } = useBanners();
  useOneSignal();

  const { data: remainBubble } = useQuery<IRemainPoint>({
    queryKey: ['point', 'remain-point'],
    queryFn: () => fetcher('/api/point/remain-point'),
  });
  const openQrcode = async () => {
    try {
      const result = await fetcher('/api/account/pre-auth');
      openModal({
        component: QrcodeModal,
        props: {
          accessToken: result.accessToken,
          refresh: () => {
            closeModal(QrcodeModal);
            openQrcode();
          },
        },
      });
    } catch (error) {
      if (getErrorMessage(error) === ERROR_MESSAGE.G002) {
        openModal({
          position: 'bottom',
          component: PaymentCreatModal,
          props: {
            onClose: () => closeModal(PaymentCreatModal),
          },
        });
      } else {
        openModal({
          component: QrcodeErrorModal,
          props: {
            error,
            onClose: () => closeModal(QrcodeErrorModal),
          },
        });
      }
    }
  };

  const openMap = () => {
    if (myLocation.latitude === 0) {
      openToast({
        component: '위치 정보를 불러오는 중입니다.',
      });

      return;
    }
    openModal({
      component: MapModal,
      position: 'bottom',
      fullScreen: true,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      setMyLocation({ latitude: coords.latitude, longitude: coords.longitude });
    });
  }, [setMyLocation]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <Fragment>
      <Head>
        <meta name="theme-color" content="#056BF1" />
      </Head>
      <Wrapper>
        <ColorBg />
        <NavigationBar />
        <Name>
          {user ? (
            `${user?.name || '사용자'}님의 버블`
          ) : (
            <div className="flex flex-col gap-[6px]">
              <Custom.Skeleton className="w-[100px]" />
              <Custom.Skeleton className="w-[140px]" />
            </div>
          )}
        </Name>
        <BubbleWrapper>
          <BubbleIcon src="/svg/bubble.svg" alt="버블" />
          <BubbleText>
            {(remainBubble?.freePoint ?? 0) + (remainBubble?.payPoint ?? 0)}개
          </BubbleText>
        </BubbleWrapper>
        <ButtonWrapper>
          <FullLink href="/bubble/history">
            <HistoryButton>버블 내역</HistoryButton>
          </FullLink>
          <FullLink href="/bubble/charge">
            <Custom.Button>버블 충전하기</Custom.Button>
          </FullLink>
        </ButtonWrapper>
        <ButtonWrapper>
          <MapSquareButton onClick={openMap} />
          <SquareButton onClick={openQrcode}>
            <img
              src="/svg/qrcode.svg"
              className="h-[60%] max-h-[60%]"
              alt="QR"
            />
          </SquareButton>
        </ButtonWrapper>
        <BottomContainer>
          <SlickBanner banners={banners} />
        </BottomContainer>
      </Wrapper>
      <InstallPrompt />
    </Fragment>
  );
}
