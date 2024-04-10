import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect } from 'react';
import { TbRefresh } from 'react-icons/tb';
import tw from 'tailwind-styled-components';
import useTimer from '@/hooks/useTimer';
import { getTimeFormat } from '@/utils/util';

interface IQrcodeModalProps {
  accessToken: string;
  refresh: () => void;
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

const QrcodeModal = ({ accessToken, refresh }: IQrcodeModalProps) => {
  const { seconds, handleSeconds } = useTimer();

  useEffect(() => {
    handleSeconds(300);
  }, [accessToken, handleSeconds]);

  return (
    <Wrapper>
      <QrcodeContainer>
        <QRCodeSVG
          value={accessToken}
          size={200}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          level={'L'}
          includeMargin={false}
        />
        {seconds === 0 && (
          <Blur>
            <RefreshButton onClick={refresh}>
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
    </Wrapper>
  );
};

export default QrcodeModal;
