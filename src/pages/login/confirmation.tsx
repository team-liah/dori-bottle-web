import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import PhoneInputLayer from '@/components/login/PhoneInputLayer';
import VerifyInputLayer from '@/components/login/VerifyInputLayer';
import { ILoginFormInputs } from '@/types/common';

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

  const onSubmit: SubmitHandler<ILoginFormInputs> = async (data) => {
    try {
      console.log(data);
    } catch (e) {
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <FormProvider {...methods}>
      <form>
        {step === 0 && <PhoneInputLayer onClickNext={() => setStep(1)} />}
        {step === 1 && (
          <VerifyInputLayer onClickNext={methods.handleSubmit(onSubmit)} />
        )}
      </form>
    </FormProvider>
  );
};

export default Confirmation;
