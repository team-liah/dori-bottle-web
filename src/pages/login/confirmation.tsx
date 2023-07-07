import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { getErrorMessage } from '../../../utils/error';
import PhoneInputLayer from '@/components/login/PhoneInputLayer';
import VerifyInputLayer from '@/components/login/VerifyInputLayer';
import { ILoginFormInputs } from '@/types/user';

//#region Styled Component

//#endregion

const Confirmation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, []);

  const methods = useForm<ILoginFormInputs>({
    defaultValues: {
      loginId: '',
      loginPassword: '',
    },
  });

  // 인증번호 전송
  const onSendVerificationCode = async () => {
    try {
      await axios.post('/api/account/auth/send-sms', {
        // loginId: methods.getValues('loginId'),
        loginId: '010-7190-5608',
      });
      setStep(1);
    } catch (error) {
      methods.setError('loginId', {
        type: 'manual',
        message: getErrorMessage(error),
      });
    }
  };

  const onSubmit: SubmitHandler<ILoginFormInputs> = async (data) => {
    try {
      console.log(data);
    } catch (e) {
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 0 && <PhoneInputLayer onSubmit={onSendVerificationCode} />}
        {step === 1 && (
          <VerifyInputLayer
            onSubmit={methods.handleSubmit(onSubmit)}
            onClickBack={() => setStep(0)}
          />
        )}
      </form>
    </FormProvider>
  );
};

export default Confirmation;
