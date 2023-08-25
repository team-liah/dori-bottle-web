import { motion } from 'framer-motion';
import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';

interface IInstallationModalProps {
  onClickInstall: () => void;
  onClose: () => void;
}

//#region Styled Component

const Wrapper = tw(motion.div)`
  pt-[30px]
  px-5
  bg-white
  flex
  flex-col
  gap-4
`;

const TitleWrapper = tw.div`
  flex
  flex-row
  gap-4
`;

const TitleText = tw.div`
  whitespace-pre-line
  text-[18px]
  font-bold
  leading-[22px]
  text-gray1
`;

const ButtonWrapper = tw.div`
  flex
  w-full
  flex-row
  gap-2
`;

const CancelButton = tw(Custom.Button)`
  text-main-blue
  bg-white
  border-[1px]
`;

const BubbleIcon = tw.img`
  h-[50px]
  w-[50px]
  rounded-[10px]
  bg-white
  p-1
  shadow-[0_0_11px_0px_rgba(17,17,17,0.15)]
`;

//#endregion

const InstallationModal = ({
  onClickInstall,
  onClose,
}: IInstallationModalProps) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <BubbleIcon src="/svg/bubble.svg" />
        <TitleText>{'도리보틀 바로가기를\n추가하시겠습니까?'}</TitleText>
      </TitleWrapper>
      <ButtonWrapper>
        <CancelButton onClick={onClose}>취소</CancelButton>
        <Custom.Button onClick={onClickInstall}>추가하기</Custom.Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default InstallationModal;
