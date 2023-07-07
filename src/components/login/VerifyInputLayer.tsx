import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import Input from '@/components/common/Input';
import Layer from '@/components/common/Layer';
import { ILoginFormInputs } from '@/types/user';

interface IVerifyInputLayerProps {
  onSubmit: () => void;
  onClickBack: () => void;
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

const VerifyInputLayer = ({
  onSubmit,
  onClickBack,
}: IVerifyInputLayerProps) => {
  const { control } = useFormContext<ILoginFormInputs>();

  return (
    <Layer
      title="인증번호 입력"
      footer={<Custom.Button onClick={onSubmit}>다음</Custom.Button>}
      onClickBack={onClickBack}
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
              type="number"
              autoFocus={true}
              field={field}
            />
          )}
        />
      </Wrapper>
    </Layer>
  );
};

export default VerifyInputLayer;
