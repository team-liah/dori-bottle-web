import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AlertModal from '@/components/common/modal/AlertModal';
import PaymentPenaltyLayer from '@/components/payment/penalty/PaymentPenaltyLayer';
import useModals from '@/hooks/useModals';
import useToast from '@/hooks/useToast';
import api from '@/service/api';
import { IPaymentRefundFormInputs } from '@/types/payment';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

//#endregion

export default function Penalty() {
  const router = useRouter();
  const { openModal, closeModal } = useModals();
  const { openToast } = useToast();

  const methods = useForm<IPaymentRefundFormInputs>();

  useEffect(() => {
    methods.reset();
  }, [methods]);

  const openConfirmModal = () => {
    openModal({
      component: AlertModal,
      props: {
        children: '블락을 해제하시겠습니까?',
        confirmText: '해제하기',
        onConfirm: onSubmit,
        onClose: () => {
          closeModal(AlertModal);
        },
      },
    });
  };

  const onSubmit = async () => {
    try {
      await api.post('/api/payment/unblock-account', {
        body: JSON.stringify(methods.getValues()),
      });

      openModal({
        component: AlertModal,
        props: {
          children:
            '정상적으로 서비스 이용이 가능합니다.\n도리보틀을 사랑해주셔서 감사합니다.',
          confirmText: '홈으로',
          onClose: () => {
            closeModal(AlertModal);
            router.replace('/');
          },
        },
      });
    } catch (error) {
      openToast({
        component: getErrorMessage(error),
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(openConfirmModal)}>
        <PaymentPenaltyLayer />
      </form>
    </FormProvider>
  );
}
