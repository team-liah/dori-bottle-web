import { useQuery } from '@tanstack/react-query';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import tw from 'tailwind-styled-components';
import { fetcher } from '@/service/fetch';
import { ILoginResponse } from '@/types/user';

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
`;

//#endregion

const QrcodeModal = ({ onClose }: IQrcodeModalProps) => {
  // TODO: QR Code 생명 주기 관리
  const { data, isLoading } = useQuery<ILoginResponse>({
    queryKey: ['qrcode'],
    queryFn: () => fetcher('/api/account/pre-auth'),
    refetchOnMount: true,
  });

  return (
    <Wrapper onClick={onClose}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <QRCodeSVG
          value={data?.accessToken || ''}
          size={128}
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
      )}
    </Wrapper>
  );
};

export default QrcodeModal;
