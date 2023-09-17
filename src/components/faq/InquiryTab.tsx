import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import KakaoButton from '@/components/common/KakaoButton';

//#region Styled Component

const Wrapper = tw(Custom.TabWrapper)`
  gap-8
  pt-[calc(50dvh-300px)]
`;

const InfoWrapper = tw.div`
  flex
  w-full
  flex-col
  items-center
  gap-6
`;

const Icon = tw.img`
  h-[181px]
  w-[195px]
  scale-x-[-1]
`;

const InfoText = tw.div`
  whitespace-pre
  text-center
  text-[20px]
  font-medium
  leading-normal
  text-gray1
`;

//#endregion

const InquiryTab = () => {
  return (
    <Wrapper>
      <InfoWrapper>
        <Icon src="/assets/Character.png" />
        <InfoText>{'카카오톡 상담채널로\n문의해주세요!'}</InfoText>
      </InfoWrapper>
      <KakaoButton />
    </Wrapper>
  );
};

export default InquiryTab;
