import React from 'react';
import tw from 'tailwind-styled-components';

interface IExampleCompositionComponentProps {
  name: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

//#region Styled Components

const Container = tw.div`
  flex
  w-[400px]
  flex-col
  p-2
`;

const Description = tw.span`
  bg-blue
p-2
`;

const BodyContainer = tw.div`
  flex
  flex-col
  gap-1
  bg-gray
`;

//#endregion

const ExampleCompositionComponent = ({
  name,
  children,
  header,
  footer,
}: IExampleCompositionComponentProps) => {
  return (
    <Container>
      <Description>{name}</Description>
      <BodyContainer>
        {header}
        {children}
        {footer}
      </BodyContainer>
    </Container>
  );
};

export default ExampleCompositionComponent;
