import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import { IOption } from '@/types/common';

interface IInputProps {
  id?: string;
  options: IOption[];
  label?: string;
  error?: string;
  field: ControllerRenderProps<any, any>;
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
  flex
  w-full
  flex-row
  gap-[15px]
`;

const StyeldRadio = tw.div<{ $selected?: boolean }>`
  flex
  h-[58px]
  flex-1
  cursor-pointer
  items-center
  justify-center
  rounded-[15px]
  border
  border-solid
  border-main-blue
  text-[16px]
  font-medium
  tracking-[-0.48px]
  text-main-blue
  ${({ $selected }) => $selected && 'bg-main-blue text-white'}
  transition-all
`;

const AlertCircleIcon = tw(FiAlertCircle)`
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

const Radio = ({ options, label, error, field }: IInputProps) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        {options.map((option) => (
          <StyeldRadio
            key={option.value}
            $selected={field.value === option.value}
            onClick={() => field.onChange(option.value)}
          >
            {option.label}
          </StyeldRadio>
        ))}
        {error && <AlertCircleIcon />}
      </InputWrapper>
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

export default Radio;
