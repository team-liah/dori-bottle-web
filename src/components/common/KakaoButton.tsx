import React from 'react';
import tw from 'tailwind-styled-components';

//#region Styled Component

const Button = tw.div`
  flex
  h-[56px]
  w-full
  items-center
  justify-center
  rounded-[20px]
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

const KakaoButton = () => {
  const onClickChannelButton = () => {
    window.open(process.env.NEXT_PUBLIC_KAKAO_PLUS_URL, '_blank');
  };

  return (
    <Button onClick={onClickChannelButton}>
      <KakaoIcon src="/svg/kakao.svg" />
      카카오톡 문의하기
    </Button>
  );
};

export default KakaoButton;
