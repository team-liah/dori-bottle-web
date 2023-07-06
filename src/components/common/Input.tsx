import React from 'react';
import { AlertCircle } from 'react-feather';
import { ControllerRenderProps } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import { ILoginFormInputs } from '@/types/common';

interface IInputProps {
  id?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string;
  value?: string | number;
  label?: string;
  readOnly?: boolean;
  error?: boolean;
  errorText?: string;
  maxLength?: number;
  field: ControllerRenderProps<ILoginFormInputs, any>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

//#region Styled Components

const Wrapper = tw.div`
  relative
  flex
  w-full
  flex-col
  gap-4
`;

const Label = tw.label`
  text-[20px]
  font-medium
  tracking-[-0.6px]
  text-gray1
`;

const InputWrapper = tw.div`
  relative
  w-full
`;

const StyledInput = tw.input<{ $error?: boolean }>`
  w-full
  rounded-[15px]
  border-[1.5px]
  border-unactivated
  p-[19px]
  text-[16px]
  font-medium
  leading-[22px]
  tracking-[-0.48px]
  text-gray1
  focus-within:outline-main-blue
  ${({ $error }) => $error && 'border-alert'}
`;

const AlertCircleIcon = tw(AlertCircle)`
  w-[24px]
  h-[24px]
  text-white
  fill-alert
  absolute
  top-[50%]
  translate-y-[-50%]
  right-[19px]
`;

const ErrorText = tw.span`
  font-Pretendard
  absolute
  bottom-[-30px]
  left-[5px]
  text-[14px]
  font-medium
  text-alert
`;

//#endregion

const Input = ({
  id,
  type,
  placeholder,
  defaultValue,
  label,
  error,
  errorText,
  maxLength,
  readOnly,
  field,
}: IInputProps) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <StyledInput
          type={type}
          id={id}
          defaultValue={defaultValue}
          readOnly={readOnly}
          placeholder={placeholder}
          maxLength={maxLength}
          $error={error}
          {...field}
        />
        {error && <AlertCircleIcon />}
      </InputWrapper>
      <ErrorText>{errorText}</ErrorText>
    </Wrapper>
  );
};

export default Input;