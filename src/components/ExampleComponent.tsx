import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

interface IExampleComponentProps {
  name: string;
}

//#region Styled Components

const Container = tw.div<{ $isSelected: boolean }>`
  box-border
  cursor-pointer
  border-solid
  border-black
  p-2
  ${(props) => props.$isSelected && 'border-[4px]'}
`;

//#endregion

const ExampleComponent = ({ name }: IExampleComponentProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected((current) => !current);
  };

  return (
    <Container onClick={handleClick} $isSelected={isSelected}>
      {name}
    </Container>
  );
};

export default ExampleComponent;
