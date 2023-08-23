import React from 'react';
import { IoIdCard } from 'react-icons/io5';
import tw from 'tailwind-styled-components';
import Layer from '@/components/common/Layer';

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-col
  gap-8
  pt-[calc(50dvh-240px)]
`;

const InfoWrapper = tw.div`
  flex
  w-full
  flex-col
  items-center
  gap-6
`;

const IdCardIcon = tw(IoIdCard)`
  text-back-line
  w-[159px]
  h-[159px]
`;

const InfoText = tw.div`
  whitespace-pre
  text-center
  text-[20px]
  font-medium
  leading-normal
  text-gray1
`;

const KakaoButton = tw.div`
  flex
  h-[56px]
  w-full
  items-center
  justify-center
  rounded-full
  bg-[#FEE500]
  text-[16px]  
  font-medium
  leading-[22px]
  text-opacity-90
`;

const KakaoIcon = tw.img`
  mr-[10px]
  inline
  h-[18px]
  w-[18px]
`;

//#endregion

const DepartmentVerifyLayer = () => {
  const onClickChannelButton = () => {
    window.open(process.env.NEXT_PUBLIC_KAKAO_PLUS_URL, '_blank');
  };

  return (
    <Layer title="기관 인증하기">
      <Wrapper>
        <InfoWrapper>
          <IdCardIcon />
          <InfoText>
            {'학생증/재학증명서를\n카카오톡으로 보내주세요 :)'}
          </InfoText>
        </InfoWrapper>
        <KakaoButton onClick={onClickChannelButton}>
          <KakaoIcon src="/svg/kakao.svg" />
          카카오톡 문의하기
        </KakaoButton>
      </Wrapper>
    </Layer>
  );
};

export default DepartmentVerifyLayer;
