import React from 'react';
import tw from 'tailwind-styled-components';

interface IGuideTextItemProps {
  id: number;
  title: string;
  image?: React.ReactNode;
}

//#region Styled Component

const Wrapper = tw.div`
  mx-4
  flex
  h-[245px]
  flex-col
  items-center
  justify-between
  rounded-[16px]
  py-10
  shadow-[0_0_5px_0px_rgba(17,17,17,0.15)]
`;

const StepText = tw.div`
  mb-5
  font-jalnan
  text-[18px]
  font-bold
  leading-[22px]
  tracking-[0.18px]
  text-gray1
`;

const TitleText = tw.div`
  whitespace-pre-line
  text-center
  text-[16px]
  font-medium
  leading-[22px]
  tracking-[-0.48px]
  text-gray1
`;

//#endregion

const GuideTextItem = ({ id, title, image }: IGuideTextItemProps) => {
  return (
    <div>
      <StepText>{`STEP ${id}.`}</StepText>
      <Wrapper>
        {image}
        <TitleText>{title}</TitleText>
      </Wrapper>
    </div>
  );
};

export default GuideTextItem;
