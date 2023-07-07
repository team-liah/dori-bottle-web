import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import { getHypenTel } from '../../../utils/util';
import * as Custom from '@/components/common/CustomStyledComponent';
import Input from '@/components/common/Input';
import Layer from '@/components/common/Layer';
import { ILoginFormInputs } from '@/types/user';

interface IPhoneInputLayerProps {
  onSubmit: () => void;
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

const PhoneInputLayer = ({ onSubmit }: IPhoneInputLayerProps) => {
  const {
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<ILoginFormInputs>();

  return (
    <Layer
      title="휴대폰번호 입력"
      footer={
        <Custom.Button
          disabled={watch('loginId').length !== 13}
          onClick={onSubmit}
        >
          다음
        </Custom.Button>
      }
    >
      <Wrapper>
        <Controller
          name="loginId"
          control={control}
          rules={{ required: true }}
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
