import React from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import tw from 'tailwind-styled-components';

type PolygonSide = 'left' | 'right' | 'top' | 'bottom';

interface IBubbleProgressBarProps {
  children: React.ReactNode;
  side?: PolygonSide;
  color?: string;
}
//#region Styled Component

const BubbleWrapper = tw.div`
  relative
  flex
  items-center
  justify-center
`;

const BubbleText = tw.div`
  rounded-full
  px-4
  py-2
  text-white
`;
const Edge = tw(BsTriangleFill)<{ $side: PolygonSide }>`
  absolute
  ${({ $side }) => {
    switch ($side) {
      case 'left':
        return 'rotate-270 translate-x-[4px]';
      case 'right':
        return 'rotate-90 translate-x-[-4px]';
      case 'top':
        return 'rotate-0 translate-y-[-4px]';
      case 'bottom':
        return 'rotate-180 translate-y-[50%] bottom-0';
    }
  }}
`;

//#endregion

const TextBubble = ({
  children,
  side = 'right',
  color = '#056BF1',
}: IBubbleProgressBarProps) => {
  return (
    <BubbleWrapper>
      <BubbleText
        style={{
          backgroundColor: color,
        }}
      >
        {children}
      </BubbleText>
      <Edge
        $side={side}
        style={{
          color,
        }}
      />
    </BubbleWrapper>
  );
};

export default TextBubble;
