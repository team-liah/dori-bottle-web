import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import Input from '@/components/common/Input';
import Layer from '@/components/common/Layer';
import { IPaymentRefundFormInputs } from '@/types/payment';

interface IPaymentRefundFormLayer {
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
  gap-7
  pt-14
`;
//#endregion

const PaymentRefundFormLayer = ({ onClickBack }: IPaymentRefundFormLayer) => {
  const {
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<IPaymentRefundFormInputs>();

  return (
    <Layer
      title="버블 환불 및 회원 탈퇴"
      onClickBack={onClickBack}
      footer={
        <Custom.Button
          type="submit"
          disabled={
            !watch('bankAccountNumber') ||
            !watch('bankAccountOwner') ||
            !watch('bankName') ||
            isSubmitting
          }
        >
          환불 및 탈퇴하기
        </Custom.Button>
      }
    >
      <Wrapper>
        <Controller
          name="bankName"
          control={control}
          rules={{
            required: '은행명을 입력해주세요.',
          }}
          render={({ field }) => (
            <Input
              label="은행명"
              id="bankName"
              maxLength={20}
              autoFocus={true}
              error={errors.bankName?.message}
              field={field}
            />
          )}
        />

        <Controller
          name="bankAccountNumber"
          control={control}
          rules={{
            required: '계좌번호를 입력해주세요.',
          }}
          render={({ field }) => (
            <Input
              label="계좌번호"
              id="bankAccountNumber"
              maxLength={20}
              autoFocus={true}
              error={errors.bankAccountNumber?.message}
              field={field}
            />
          )}
        />
        <Controller
          name="bankAccountOwner"
          control={control}
          rules={{
            required: '예금주명을 입력해주세요.',
          }}
          render={({ field }) => (
            <Input
              label="예금주명"
              id="bankAccountOwner"
              maxLength={20}
              autoFocus={true}
              error={errors.bankAccountOwner?.message}
              field={field}
            />
          )}
        />
      </Wrapper>
    </Layer>
  );
};

export default PaymentRefundFormLayer;
