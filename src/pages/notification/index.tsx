import React from 'react';
import tw from 'tailwind-styled-components';
import Layer from '@/components/common/Layer';

//#region Styled Component

const Wrapper = tw.div`
  h-full
  flex
  w-full
  flex-col
  items-center
  px-[48px]
  pt-[132px]
`;

const Title = tw.div`
  mb-[40px]
  w-full
  whitespace-pre-line
  text-[24px]
  leading-[35px]
  text-gray1
`;
//#endregion

export default function Notification() {
  return (
    <Layer title="알림">
      <Wrapper>
        <Title>알림이 없습니다.</Title>
      </Wrapper>
    </Layer>
  );
}
