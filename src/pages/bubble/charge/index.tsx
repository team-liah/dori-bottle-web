import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ChargeDetailLayer from '@/components/bubble/charge/ChargeDetailLayer';
import ChargeListLayer from '@/components/bubble/charge/ChargeListLayer';
import AlertModal from '@/components/common/modal/AlertModal';
import PaymentCreatModal from '@/components/common/modal/PaymentCreatModal';
import useModals from '@/hooks/useModals';
import useToast from '@/hooks/useToast';
import api from '@/service/api';
import { IProductFormInputs } from '@/types/product';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

//#endregion

export default function Charge() {
  const router = useRouter();
  const { openModal, closeModal } = useModals();
  const { openToast } = useToast();
  const [step, setStep] = useState(0);

  const methods = useForm<IProductFormInputs>();

  useEffect(() => {
    setStep(0);
  }, []);

  const onSubmitCharge = async () => {
    try {
      await api.post('/api/payment/save-point', {
        categoryId: methods.getValues('product').id,
      });
      openModal({
        component: AlertModal,
        props: {
          children: (
            <div className="flex flex-col items-center gap-4">
              <img
                className="h-[80px] w-[80px]"
                src="/svg/bubble.svg"
                alt="next"
              />
              <span>{`버블 ${
                methods.getValues('product').amounts
              }개를 충전했어요!`}</span>
            </div>
          ),
          onClose: () => {
            closeModal(AlertModal);
            router.replace('/');
          },
        },
      });
    } catch (error: any) {
      if (error.response.status === 404) {
        openModal({
          position: 'bottom',
          component: PaymentCreatModal,
          props: {
            onClose: () => closeModal(PaymentCreatModal),
          },
        });
      } else {
        openToast({
          component: getErrorMessage(error),
        });
      }
    }
  };

  const onSubmit = async () => {
    if (step === 0) {
      setStep(1);
    } else {
      await onSubmitCharge();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 0 && <ChargeListLayer />}
        {step === 1 && <ChargeDetailLayer onClickBack={() => setStep(0)} />}
      </form>
    </FormProvider>
  );
}
