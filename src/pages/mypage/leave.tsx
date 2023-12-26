import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AlertModal from '@/components/common/modal/AlertModal';
import LeaveInputLayer from '@/components/mypage/LeaveInputLayer';
import LeaveLayer from '@/components/mypage/LeaveLayer';
import useModals from '@/hooks/useModals';
import useToast from '@/hooks/useToast';
import { ILeaveFormInputs, requestUserLeave } from '@/types/user';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

//#endregion

export default function Leave() {
  const router = useRouter();
  const { openModal, closeModal } = useModals();
  const { openToast } = useToast();
  const [step, setStep] = useState(0);

  const methods = useForm<ILeaveFormInputs>();

  useEffect(() => {
    setStep(0);
  }, []);

  const onSubmitLeave = async () => {
    try {
      await requestUserLeave(methods.getValues());
      openModal({
        component: AlertModal,
        props: {
          onClose: () => {
            closeModal(AlertModal);
            router.replace('/login');
          },
          confirmText: '닫기',
          children:
            '탈퇴가 완료되었습니다.\n도리보틀을 이용해주셔서 감사합니다.',
        },
      });
    } catch (error: any) {
      if (error.response?.data?.code === 'C011') {
        openModal({
          component: AlertModal,
          props: {
            onClose: () => {
              closeModal(AlertModal);
            },
            confirmText: '닫기',
            children: (
              <span>
                {'대여 중인 컵이 있어\n탈퇴가 불가합니다.\n'}
                <span className="text-main-blue">컵을 먼저 반납해주세요.</span>
              </span>
            ),
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
      await onSubmitLeave();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 0 && <LeaveLayer />}
        {step === 1 && <LeaveInputLayer onClickBack={() => setStep(0)} />}
      </form>
    </FormProvider>
  );
}
