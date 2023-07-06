import { useRouter } from 'next/router';
import React from 'react';
import * as Icon from 'react-feather';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';

interface ILayerProps {
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

//#region Styled Components

const Wrapper = tw(Custom.MobileWrapper)`
  flex
  flex-col
  pt-[66px]
  justify-between
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

const BackButton = tw(Icon.ArrowLeft)`
  w-[24px]
  h-[24px]
  cursor-pointer
  text-gray1
  absolute
`;

const Body = tw.div`
  flex
  w-full
`;

//#endregion

const Layer = ({ title, children, footer }: ILayerProps) => {
  const router = useRouter();

  return (
    <Wrapper>
      <BackButton onClick={() => router.back()} />
      <TopWrapper>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Body>{children}</Body>
      </TopWrapper>
      {footer}
    </Wrapper>
  );
};

export default Layer;
