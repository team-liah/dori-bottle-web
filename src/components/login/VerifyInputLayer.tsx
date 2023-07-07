import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import { getTimeFormat } from '../../../utils/util';
import * as Custom from '@/components/common/CustomStyledComponent';
import Input from '@/components/common/Input';
import Layer from '@/components/common/Layer';
import useTimer from '@/hooks/useTimer';
import useToast from '@/hooks/useToast';
import { ILoginFormInputs } from '@/types/user';

interface IVerifyInputLayerProps {
  onResend: () => void;
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
  gap-[10px]
  pt-14
`;

const RefreshButton = tw.div`
  ml-auto
  flex
  flex-row
  items-center
  gap-[6px]
`;

const RefreshText = tw.span`
  font-medium
  text-gray2
`;

//#endregion

const VerifyInputLayer = ({
  onResend,
  onSubmit,
  onClickBack,
}: IVerifyInputLayerProps) => {
  const {
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<ILoginFormInputs>();
  const { openToast } = useToast();
  const { seconds, handleSeconds } = useTimer();

  useEffect(() => {
    handleSeconds(300);
  }, [handleSeconds]);

  const handleClickRefresh = () => {
    if (seconds > 290) {
      openToast({
        component: '10초 이내에는 다시 전송할 수 없습니다.',
      });

      return;
    }

    onResend();
    handleSeconds(300);
  };

  return (
    <Layer
      title="인증번호 입력"
      footer={
        <Custom.Button
          disabled={seconds < 1 || watch('loginPassword').length < 6}
          onClick={onSubmit}
        >
          다음
        </Custom.Button>
      }
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
              type="text"
              maxLength={6}
              error={errors.loginPassword?.message}
              autoFocus={true}
              autoComplete={'one-time-code'}
              field={{
                ...field,
                onChange: (e) => {
                  clearErrors('loginPassword');
                  field.onChange(e);
                },
              }}
            />
          )}
        />
        <RefreshButton onClick={handleClickRefresh}>
          <img src="/svg/Refresh.svg" alt="next" />
          <RefreshText>재전송 ({getTimeFormat(seconds)})</RefreshText>
        </RefreshButton>
      </Wrapper>
    </Layer>
  );
};

export default VerifyInputLayer;
