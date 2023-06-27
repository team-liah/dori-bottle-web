import React from 'react';
import tw from 'tailwind-styled-components';

interface ITestModalProps {
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

const TestModal = ({ onClose }: ITestModalProps) => {
  return (
    <Wrapper onClick={onClose}>
      <span>TEST</span>
    </Wrapper>
  );
};

export default TestModal;
