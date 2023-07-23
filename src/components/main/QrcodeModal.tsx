import React from 'react';
import tw from 'tailwind-styled-components';

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
  return (
    <Wrapper onClick={onClose}>
      <span>QR</span>
    </Wrapper>
  );
};

export default QrcodeModal;
