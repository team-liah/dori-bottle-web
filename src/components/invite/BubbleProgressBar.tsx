import React from 'react';
import tw from 'tailwind-styled-components';
import TextBubble from './TextBubble';

interface IBubbleProgressBarProps {
  percent: number;
}

//#region Styled Components

const Wrapper = tw.div`
  relative
  mt-[60px]
  h-[26px]
  w-[90%]
  rounded-full
  bg-[#F2F3F8]
`;

const Progress = tw.div`
  0px
  absolute
  top-0
  left-0
  flex
  h-[26px]
  items-center
  justify-end
  rounded-tl-full  
  rounded-bl-full  
  bg-main-blue
  transition-all
  duration-300
  ease-in-out
`;

const PointWrapper = tw.div`
  relative
  flex
  translate-x-[15px]
  flex-col
`;

const BubbleIcon = tw.img`
  h-[50px]
  min-h-[50px]
  w-[50px]
  min-w-[50px]
`;

const PointTextBubbleWrapper = tw.div`
  absolute
  top-[-48px]
`;

//#endregion

const BubbleProgressBar = ({ percent }: IBubbleProgressBarProps) => {
  return (
    <Wrapper>
      <Progress
        style={{
          width: `${percent > 100 ? 100 : percent < 5 ? 5 : percent}%`,
        }}
      >
        <PointWrapper>
          <PointTextBubbleWrapper>
            <TextBubble side="bottom">{percent}</TextBubble>
          </PointTextBubbleWrapper>
          <BubbleIcon src="/svg/bubble3.svg" alt="next" />
        </PointWrapper>
      </Progress>
    </Wrapper>
  );
};

export default BubbleProgressBar;
