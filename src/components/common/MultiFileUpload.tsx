import React, { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import tw from 'tailwind-styled-components';

interface IMultiFileUploadProps {
  label?: React.ReactNode;
  readOnly?: boolean;
  error?: string;
  field: ControllerRenderProps<any, any>;
  maxCount?: number;
}

const ErrorText = tw.span`
  font-Pretendard
  absolute
  bottom-[-30px]
  left-[5px]
  text-[12px]
  font-medium
  text-alert
`;

//#region Styled Component

const Wrapper = tw.div`
  relative
  flex
  w-full
  flex-col
  gap-4
`;

//#endregion

const MultiFileUpload = ({
  label,
  field,
  error,
  readOnly,
  maxCount,
}: IMultiFileUploadProps) => {
  const [originFileList, setOriginFileList] = useState();

  return (
    <Wrapper>
      {label}
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

export default MultiFileUpload;
