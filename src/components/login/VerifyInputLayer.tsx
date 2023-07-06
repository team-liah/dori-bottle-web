import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import Input from '@/components/common/Input';
import Layer from '@/components/common/Layer';
import { ILoginFormInputs } from '@/types/common';

interface IVerifyInputLayerProps {
  onClickNext: () => void;
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

const VerifyInputLayer = ({ onClickNext }: IVerifyInputLayerProps) => {
  const { control } = useFormContext<ILoginFormInputs>();

  return (
    <Layer
      title="인증번호 입력"
      footer={<Custom.Button onClick={onClickNext}>다음</Custom.Button>}
    >
      <Wrapper>
        <Controller
          name="loginPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              label="인증번호 6자리를 입력해주세요"
              id="loginPassword"
              type="text"
              field={field}
            />
          )}
        />
      </Wrapper>
    </Layer>
  );
};

export default VerifyInputLayer;
