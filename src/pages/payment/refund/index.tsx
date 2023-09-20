import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AlertModal from '@/components/common/modal/AlertModal';
import PaymentRefundFormLayer from '@/components/payment/refund/PaymentRefundFormLayer';
import PaymentRefundLayer from '@/components/payment/refund/PaymentRefundLayer';
import useAuth from '@/hooks/useAuth';
import useModals from '@/hooks/useModals';
import useToast from '@/hooks/useToast';
import api from '@/service/api';
import { fetcher } from '@/service/fetch';
import { IPaymentRefundFormInputs } from '@/types/payment';
import { IRemainPoint } from '@/types/point';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

//#endregion

export default function Refund() {
  const router = useRouter();
  const { logout } = useAuth();
  const { openModal, closeModal } = useModals();
  const { openToast } = useToast();
  const [step, setStep] = useState(0);

  const methods = useForm<IPaymentRefundFormInputs>();

  const { data: remainBubble } = useQuery<IRemainPoint>({
    queryKey: ['point', 'remain-point'],
    queryFn: () => fetcher('/api/point/remain-point'),
  });

  useEffect(() => {
    setStep(0);
    methods.reset();
    methods.setValue('amount', (remainBubble?.payPoint || 0) * 350);
  }, [methods, remainBubble?.payPoint]);

  const onSubmitRefund = async () => {
    try {
      await api.post('/api/account/inactivate', {
        bankAccount: {
          bank: methods.getValues('bankName'),
          accountNumber: methods.getValues('bankAccountNumber'),
          accountHolder: methods.getValues('bankAccountOwner'),
        },
      });

      openModal({
        component: AlertModal,
        props: {
          children:
            '환불 및 탈퇴 처리가 완료되었습니다.\n도리보틀을 사랑해주셔서 감사합니다.',
          onClose: () => {
            closeModal(AlertModal);
            logout();
            router.push('/login');
          },
        },
      });
    } catch (error) {
      openToast({
        component: getErrorMessage(error),
      });
    }
  };

  const onSubmit = async () => {
    if (step === 0) {
      setStep(1);
    } else {
      await onSubmitRefund();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 0 && <PaymentRefundLayer />}
        {step === 1 && (
          <PaymentRefundFormLayer onClickBack={() => setStep(0)} />
        )}
      </form>
    </FormProvider>
  );
}
