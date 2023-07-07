import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PhoneInputLayer from '@/components/login/PhoneInputLayer';
import VerifyInputLayer from '@/components/login/VerifyInputLayer';
import useToast from '@/hooks/useToast';
import { ILoginFormInputs } from '@/types/user';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

//#endregion

const Confirmation = () => {
  const { openToast } = useToast();
  const router = useRouter();

  const methods = useForm<ILoginFormInputs>({
    defaultValues: {
      loginId: '',
      loginPassword: '',
    },
  });

  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, []);

  useEffect(() => {
    methods.clearErrors();
    methods.setValue('loginPassword', '');
  }, [step, methods]);

  // 인증번호 전송
  const onSendVerificationCode = async () => {
    try {
      await methods.trigger('loginId');
      await axios.post('/api/account/auth/send-sms', {
        loginId: methods.getValues('loginId'),
      });
      setStep(1);
    } catch (error) {
      methods.setError('loginId', {
        type: 'manual',
        message: getErrorMessage(error),
      });
    }
  };

  const onSubmitVerifyToken = async () => {
    try {
      await axios.post('/api/account/auth', methods.getValues());
      openToast({
        component: '로그인 성공',
      });
      router.push((router.query.callbackUrl as string) || '/');
    } catch (error) {
      methods.setError('loginPassword', {
        type: 'manual',
        message: getErrorMessage(error),
      });
    }
  };

  const onSubmit = async () => {
    if (step === 0) {
      await onSendVerificationCode();
    } else {
      await onSubmitVerifyToken();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 0 && <PhoneInputLayer />}
        {step === 1 && (
          <VerifyInputLayer
            onResend={onSendVerificationCode}
            onClickBack={() => setStep(0)}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default Confirmation;
