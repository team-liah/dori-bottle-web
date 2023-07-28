import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import tw from 'tailwind-styled-components';

interface IErrorProps {
  message?: string;
}

//#region Styled Component

const Wrapper = tw.div`
  h-full
  flex
  flex-col
  items-center
  justify-center
  gap-4
  pt-10
`;

const AlertCircleIcon = tw(FiAlertCircle)`
  text-unactivated
  w-[40px]
  h-[40px]
`;

const AlertText = tw.div`
  text-unactivated
`;

//#endregion

const Error = ({ message }: IErrorProps) => {
  return (
    <Wrapper>
      <AlertCircleIcon />
      <AlertText>{message || '잠시 후 다시 시도해주세요.'}</AlertText>
    </Wrapper>
  );
};

export default Error;
