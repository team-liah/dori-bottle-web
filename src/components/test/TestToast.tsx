import React from 'react';

interface ITestToastProps {
  children?: React.ReactNode;
}

//#region Styled Component

//#endregion

const TestToast = ({ children }: ITestToastProps) => {
  return <div>{children}</div>;
};

export default TestToast;
