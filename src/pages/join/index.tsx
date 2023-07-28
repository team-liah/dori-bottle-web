import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RegisterInputLayer from '@/components/join/RegisterInputLayer';
import TermsInputLayer from '@/components/join/TermsInputLayer';
import api from '@/service/api';
import { IRegisterFormInputs } from '@/types/user';

//#region Styled Component

//#endregion

const Join = () => {
  const router = useRouter();
  const methods = useForm<IRegisterFormInputs>();

  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, []);

  useEffect(() => {
    methods.clearErrors();
  }, [methods]);

  const onSubmit = async () => {
    if (step === 0) {
      await methods.trigger('birthDate');
      setStep(1);
    } else {
      await api.post('/api/account/register', {
        ...methods.getValues(),
      });
      router.push('/join/complete');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      >
        {step === 0 && <RegisterInputLayer />}
        {step === 1 && <TermsInputLayer onClickBack={() => setStep(0)} />}
      </form>
    </FormProvider>
  );
};

export default Join;
