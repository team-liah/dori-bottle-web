import { useRouter } from 'next/router';
import React from 'react';
import * as Icon from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';

interface ILayerProps {
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  fullScreen?: boolean;
  scrollable?: boolean;
  onClickBack?: () => void;
}

//#region Styled Components

const Wrapper = tw(Custom.MobileWrapper)<{ $scrollable?: boolean }>`
  flex
  flex-col
  pt-[20px]
  justify-between
  gap-10
  px-0
  ${({ $scrollable }) => $scrollable && 'overflow-y-auto pb-10'}
`;

const TopWrapper = tw.div`
  flex
  w-full
  flex-col
  items-center
`;

const Header = tw.div`
  flex
  w-full
  items-center
  justify-center
`;

const Title = tw.span`
  text-4
  font-medium
  tracking-[-0.48px]
  text-gray1
`;

const BackButton = tw(Icon.FiArrowLeft)`
  w-[24px]
  h-[24px]
  cursor-pointer
  text-gray1
  absolute
  left-[20px]
`;

const Body = tw.div<{ $full?: boolean }>`
  flex
  w-full
  ${({ $full }) => !$full && 'px-5'}
`;

const BottomWrapper = tw.div<{ $full?: boolean }>`
${({ $full }) => !$full && 'px-5'}
`;

//#endregion

const Layer = ({
  title,
  children,
  footer,
  fullScreen,
  scrollable,
  onClickBack,
}: ILayerProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onClickBack) {
      onClickBack();
    } else {
      router.back();
    }
  };

  return (
    <Wrapper $scrollable={scrollable}>
      <BackButton onClick={handleBack} />
      <TopWrapper>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Body $full={fullScreen}>{children}</Body>
      </TopWrapper>
      <BottomWrapper>{footer}</BottomWrapper>
    </Wrapper>
  );
};

export default Layer;
