import React from 'react';
import tw from 'tailwind-styled-components';

//#region Styled Component

const LoadingContainer = tw.div`
  h-full
  flex
  w-full
  items-center
  justify-center
`;

const LoadingText = tw.span`
  text-2xl
  font-bold
`;
//#endregion

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
