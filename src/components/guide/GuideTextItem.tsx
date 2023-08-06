import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';

interface IGuideTextItemProps {
  id: number;
  title: string;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-row
  items-center
  gap-[10px]
  rounded-[16px]
  bg-back-color
  px-[22px]
  py-[25px]
`;

const TitleText = tw.div`
  text-[16px]
  font-medium
  leading-[22px]
  tracking-[0.48px]
  text-main-text
`;

//#endregion

const GuideTextItem = ({ id, title }: IGuideTextItemProps) => {
  return (
    <Wrapper>
      <Custom.GuideNumber>{id}</Custom.GuideNumber>
      <TitleText>{title}</TitleText>
    </Wrapper>
  );
};

export default GuideTextItem;
