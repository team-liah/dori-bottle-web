import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RegisterInputLayer from '@/components/join/RegisterInputLayer';
import { ILoginFormInputs } from '@/types/user';

//#region Styled Component

//#endregion

const Join = () => {
  const methods = useForm<ILoginFormInputs>();

  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, []);

  useEffect(() => {
    methods.clearErrors();
  }, [methods]);

  const onSubmit = async () => {
    if (step === 0) {
      setStep(1);
    } else {
      console.log(methods.getValues());
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
      </form>
    </FormProvider>
  );
};

export default Join;
