import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import NotPaymentModal from '@/components/common/modal/NotPaymentModal';
import PaymentCompleteModal from '@/components/common/modal/PaymentCompleteModal';
import PaymentDetailLayer from '@/components/payment/PaymentDetailLayer';
import PaymentListLayer from '@/components/payment/PaymentListLayer';
import useModals from '@/hooks/useModals';
import useToast from '@/hooks/useToast';
import { IProductFormInputs } from '@/types/product';

//#region Styled Component

//#endregion

export default function Payment() {
  // TODO: 결제수단 등록이 필요한 경우
  const payment = true;

  const router = useRouter();
  const { openModal, closeModal } = useModals();
  const { openToast } = useToast();
  const [step, setStep] = useState(0);

  const methods = useForm<IProductFormInputs>();

  useEffect(() => {
    setStep(0);
  }, []);

  const onSubmitPayment = async () => {
    try {
      if (payment) {
        // TODO: 버블 충전
        openModal({
          component: PaymentCompleteModal,
          props: {
            product: methods.getValues('product'),
            onClickHome: () => {
              router.replace('/');
              closeModal(PaymentCompleteModal);
            },
          },
        });
      } else {
        openModal({
          position: 'bottom',
          component: NotPaymentModal,
        });
      }
    } catch (error) {
      openToast({
        component: '버블 충전에 실패했습니다.',
      });
    }
  };

  const onSubmit = async () => {
    if (step === 0) {
      setStep(1);
    } else {
      await onSubmitPayment();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 0 && <PaymentListLayer />}
        {step === 1 && <PaymentDetailLayer onClickBack={() => setStep(0)} />}
      </form>
    </FormProvider>
  );
}
