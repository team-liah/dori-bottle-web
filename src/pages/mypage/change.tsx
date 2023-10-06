import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PhoneInputLayer from '@/components/login/PhoneInputLayer';
import VerifyInputLayer from '@/components/login/VerifyInputLayer';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import api from '@/service/api';
import { ILoginFormInputs } from '@/types/user';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

//#endregion
const Change = () => {
  const { openToast } = useToast();
  const router = useRouter();
  const { logout } = useAuth();

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
      await api.post('/api/account/change-login-id/send-sms', {
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
      await api.put('/api/account/change-login-id', {
        authCode: methods.getValues('loginPassword'),
      });
      openToast({
        component: '변경이 완료되었습니다. 다시 로그인해주세요.',
      });
      await logout();
      router.push('/login');
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
        {step === 0 && <PhoneInputLayer title="번호 변경" />}
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

export default Change;
