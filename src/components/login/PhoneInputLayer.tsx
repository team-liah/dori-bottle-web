import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import Input from '@/components/common/Input';
import Layer from '@/components/common/Layer';
import { Regex } from '@/constants/Regex';
import { ILoginFormInputs } from '@/types/user';
import { getHypenTel } from '@/utils/util';

interface IPhoneInputLayerProps {
  title?: string;
}

//#region Styled Component

const Wrapper = tw.div`
  h-full
  flex
  w-full
  flex-col
  items-center
  justify-between
  pt-14
`;

//#endregion

const PhoneInputLayer = ({ title }: IPhoneInputLayerProps) => {
  const {
    control,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext<ILoginFormInputs>();

  return (
    <Layer
      title={title ?? '휴대폰번호 입력'}
      footer={
        <Custom.Button
          type="submit"
          disabled={watch('loginId')?.length !== 13 || isSubmitting}
        >
          다음
        </Custom.Button>
      }
    >
      <Wrapper>
        <Controller
          name="loginId"
          control={control}
          rules={{
            required: '휴대폰번호를 입력해주세요.',
            pattern: {
              value: Regex.PHONE_NUMBER_REGEX,
              message: '잘못된 전화번호 형식입니다.',
            },
          }}
          render={({ field }) => (
            <Input
              label="휴대폰번호를 입력해주세요"
              id="loginId"
              type="tel"
              maxLength={13}
              autoFocus={true}
              error={errors.loginId?.message}
              field={{
                ...field,
                onChange: (e) => {
                  clearErrors('loginId');
                  field.onChange(getHypenTel(e.target.value));
                },
              }}
            />
          )}
        />
      </Wrapper>
    </Layer>
  );
};

export default PhoneInputLayer;
