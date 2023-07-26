import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PhoneInputLayer from '@/components/login/PhoneInputLayer';
import VerifyInputLayer from '@/components/login/VerifyInputLayer';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import api from '@/service/api';
import { IAuth, ILoginFormInputs } from '@/types/user';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

//#endregion

const Confirmation = () => {
  const { openToast } = useToast();
  const router = useRouter();
  const { login } = useAuth();

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
      await api.post('/api/account/auth/send-sms', {
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
      const response = await login(methods.getValues());
      if (response.accessToken) {
        const user = jwtDecode<IAuth>(response.accessToken);
        if (user?.role === 'ROLE_GUEST') {
          router.push('/join');
        } else if (user?.role === 'ROLE_USER') {
          openToast({
            component: `${user?.name}님 반갑습니다.`,
          });
          router.push((router.query.callbackUrl as string) || '/');
        } else {
          throw new Error('권한이 없습니다.');
        }
      } else {
        throw new Error('로그인에 실패하였습니다.');
      }
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
