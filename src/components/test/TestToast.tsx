import React from 'react';
import useToast from '@/hooks/useToast';

interface ITestToastProps {
  children?: React.ReactNode;
}

//#region Styled Component

//#endregion

const TestToast = ({ children }: ITestToastProps) => {
  const { openToast } = useToast();
  const handleToast = () => {
    openToast({
      component: TestToast,
      props: { children: 'test' },
    });
  };

  return <div onClick={handleToast}>{children}</div>;
};

export default TestToast;
