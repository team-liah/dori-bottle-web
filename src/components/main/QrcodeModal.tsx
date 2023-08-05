import { useQuery } from '@tanstack/react-query';
import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect } from 'react';
import { TbRefresh } from 'react-icons/tb';
import tw from 'tailwind-styled-components';
import Loading from '../common/Loading';
import useTimer from '@/hooks/useTimer';
import { fetcher } from '@/service/fetch';
import { ILoginResponse } from '@/types/user';
import { getTimeFormat } from '@/utils/util';

interface IQrcodeModalProps {
  onClose?: () => void;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  items-center
  justify-center
  bg-white
  p-10
  pb-4
`;

const Empty = tw.div`
  flex
  h-[160px]
  w-[160px]
`;

const QrcodeContainer = tw.div`
  relative
  flex
  flex-col
  items-center
  justify-center
  gap-2
`;

const Blur = tw.div`
  absolute
  inset-0
  flex
  flex-col
  items-center
  justify-center
  gap-2
  bg-white
  bg-opacity-90
`;

const RefreshButton = tw.div`
  flex
  h-[60px]
  w-[60px]
  items-center
  justify-center
  rounded-full
  bg-main-blue
`;

const RefreshIcon = tw(TbRefresh)`
  text-white
  text-[30px]
`;

const BlurText = tw.div`
  text-[16px]
  font-medium
`;

const Timer = tw.div`
  relative
  text-[14px]
  font-medium
  text-gray2
`;

//#endregion

const QrcodeModal = ({ onClose }: IQrcodeModalProps) => {
  const { seconds, handleSeconds } = useTimer();
  const { data, isLoading, refetch } = useQuery<ILoginResponse>({
    queryKey: ['qrcode'],
    queryFn: () => fetcher('/api/account/pre-auth'),
    refetchOnMount: true,
  });

  useEffect(() => {
    if (data?.accessToken) handleSeconds(300);
  }, [data, handleSeconds]);

  return (
    <Wrapper onClick={onClose}>
      {isLoading ? (
        <Empty>
          <Loading />
        </Empty>
      ) : (
        <QrcodeContainer>
          <QRCodeSVG
            value={data?.accessToken || ''}
            size={160}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'L'}
            includeMargin={false}
            imageSettings={{
              src: '/svg/bubble.svg',
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
          {seconds === 0 && (
            <Blur>
              <RefreshButton onClick={() => refetch()}>
                <RefreshIcon />
              </RefreshButton>
              <BlurText>재발급</BlurText>
            </Blur>
          )}
          <Timer>
            {seconds === 0
              ? '인증 시간이 만료되었습니다'
              : getTimeFormat(seconds)}
          </Timer>
        </QrcodeContainer>
      )}
    </Wrapper>
  );
};

export default QrcodeModal;
