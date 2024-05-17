import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import ReactTextareaAutosize from 'react-textarea-autosize';
import tw from 'tailwind-styled-components';

interface ITextAreaProps {
  placeholder?: string;
  label?: React.ReactNode;
  readOnly?: boolean;
  error?: string;
  field: ControllerRenderProps<any, any>;
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

const StyledTextArea = tw(ReactTextareaAutosize)`
  text-[12px]
  bg-back-color
  rounded-[15px]
  px-5
  py-4
  focus:outline-none
  w-full
  resize-none
`;

//#endregion

const TextArea = ({
  label,
  placeholder,
  field,
  error,
  readOnly,
}: ITextAreaProps) => {
  return (
    <Wrapper>
      {label}
      <StyledTextArea
        placeholder={placeholder}
        readOnly={readOnly}
        {...field}
      />
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

export default TextArea;
