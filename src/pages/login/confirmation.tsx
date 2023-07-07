import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { getErrorMessage } from '../../../utils/error';
import PhoneInputLayer from '@/components/login/PhoneInputLayer';
import VerifyInputLayer from '@/components/login/VerifyInputLayer';
import useToast from '@/hooks/useToast';
import { ILoginFormInputs } from '@/types/user';

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

  const onSubmitVerifyToken: SubmitHandler<ILoginFormInputs> = async (data) => {
    try {
      await axios.post('/api/account/auth', data);
      openToast({
        component: '로그인 성공',
      });
      router.push('/');
    } catch (error) {
      methods.setError('loginPassword', {
        type: 'manual',
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 0 && <PhoneInputLayer onSubmit={onSendVerificationCode} />}
        {step === 1 && (
          <VerifyInputLayer
            onResend={onSendVerificationCode}
            onSubmit={methods.handleSubmit(onSubmitVerifyToken)}
            onClickBack={() => setStep(0)}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default Confirmation;
