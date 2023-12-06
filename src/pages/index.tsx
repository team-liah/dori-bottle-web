import { useQuery } from '@tanstack/react-query';
import { MapPinned } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { IoArrowForward } from 'react-icons/io5';
import { useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import PaymentCreatModal from '@/components/common/modal/PaymentCreatModal';
import InstallPrompt from '@/components/main/InstallPrompt';
import NavigationBar from '@/components/main/NavigationBar';
import QrcodeErrorModal from '@/components/main/QrcodeErrorModal';
import QrcodeModal from '@/components/main/QrcodeModal';
import MapModal from '@/components/main/map/MapModal';
import { ERROR_MESSAGE } from '@/constants/ErrorMessage';
import useAuth from '@/hooks/useAuth';
import useModals from '@/hooks/useModals';
import { fetcher } from '@/service/fetch';
import { myLocationState } from '@/states/MyLocationState';
import { IRemainPoint } from '@/types/point';
import { getErrorMessage } from '@/utils/error';

//#region Styled Components
const Wrapper = tw(Custom.MobileWrapper)`
  flex
  flex-col
  items-center
  justify-between
  pt-[24px]
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
  mb-8
  flex
  h-[180px]
  w-full
  basis-1/2
  flex-col
  items-center
  justify-center
  gap-2
  rounded-[16px]
  bg-[#F2F3F8]
  py-4
  font-bold
  text-gray1
  shadow-[0_0_6px_0px_rgba(17,17,17,0.12)]
`;

const FullLink = tw(Link)`
  flex-1
  w-full
`;

const HistoryButton = tw(Custom.Button)`
  bg-point-yellow
`;

const Name = tw.div`
  height-[30px]
  mb-4
  w-full
  text-left
  text-[20px]
  font-bold
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
  justify-start
  gap-4
  bg-[#E2EFFF]
  py-7
  pl-4
  pr-10
`;

const GuideButton = tw.div`
  flex
  flex-row
  items-center
`;

const GuideText = tw.div`
  text-[13px]
  font-bold
  tracking-[-0.39px]
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
  text-left
  text-[14px]
  font-medium
  leading-[22px]
  text-gray1
`;

//#endregion

const infoTextList = [
  '홈화면에 도리보틀을 추가하면\n더 편리하게 이용할 수 있어요!',
  '얼음컵과 커피믹스를 이용해\n저렴하게 커피를 마실 수 있어요!',
  '컵을 앞접시로 사용해\n음식을 나누어 먹을 수도 있어요!',
  '미지근한 음료도\n시원하게 즐길 수 있어요!',
  '배달음식과 함께\n음료도 시원하게 즐겨요!',
  '친구를 초대하면\n버블을 모을 수 있어요!',
  '불편/건의사항을 1:1문의를\n통해 편하게 말씀해주세요!',
  '학생이라면 기관등록 하고\n10%할인된 가격으로\n버블을 구매할 수 있어요!',
  '컵에 이물질을 넣거나\n파손하는 경우 레드카드가 부여돼요!',
];

export default function Home() {
  const { user, refreshUser } = useAuth();
  const { openModal, closeModal } = useModals();
  const setMyLocation = useSetRecoilState(myLocationState);
  const { data: remainBubble } = useQuery<IRemainPoint>({
    queryKey: ['point', 'remain-point'],
    queryFn: () => fetcher('/api/point/remain-point'),
  });

  const [infoText, setInfoText] = useState<string>('');

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
    openModal({
      component: MapModal,
      position: 'bottom',
      draggable: true,
    });
  };

  const getInfoText = () => {
    const random = Math.floor(Math.random() * infoTextList.length);

    return infoTextList[random];
  };

  useEffect(() => {
    setInfoText(getInfoText());
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      setMyLocation({ lat: coords.latitude, lng: coords.longitude });
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
      <Wrapper
        style={{
          background: 'linear-gradient(180deg, #056BF1 220px, #FFFFFF 100px)',
        }}
      >
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
          <SquareButton onClick={openQrcode}>
            {/* <QrCode size={'50%'} /> */}
            <img src="/svg/qrcode.svg" className="h-1/2 max-h-[50%]" alt="QR" />
            QR 인증하기
          </SquareButton>
          <SquareButton onClick={openMap}>
            <MapPinned size={'50%'} />
            자판기 지도
          </SquareButton>
        </ButtonWrapper>
        <BottomContainer>
          <img src="/assets/Character.png" className="h-[110px]" alt="QR" />
          <div className="flex flex-col items-start justify-start gap-[30px]">
            <Link href="/guide">
              <InfoText>{infoText}</InfoText>
            </Link>
            <Link href="/guide">
              <GuideButton>
                <GuideText>이용가이드 보러가기</GuideText>
                <ArrowIcon />
              </GuideButton>
            </Link>
          </div>
        </BottomContainer>
      </Wrapper>
      <InstallPrompt />
    </Fragment>
  );
}
