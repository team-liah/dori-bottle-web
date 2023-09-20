import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AlertModal from '@/components/common/modal/AlertModal';
import InviteRegisterLayer from '@/components/invite/InviteRegisterLayer';
import useModals from '@/hooks/useModals';
import api from '@/service/api';
import { IInviteRegisterFormInputs } from '@/types/user';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

//#endregion

export default function InviteRegister() {
  const router = useRouter();
  const { openModal, closeModal } = useModals();
  const methods = useForm<IInviteRegisterFormInputs>();

  useEffect(() => {
    methods.clearErrors();
    methods.setValue('invitationCode', router.query.invitationCode as string);
  }, [methods, router.query.invitationCode]);

  const onSubmit = async () => {
    try {
      await api.post('/api/me/invitation-code', { ...methods.getValues() });
      router.replace('/invite');
      openModal({
        component: AlertModal,
        props: {
          children: (
            <div className="flex flex-col items-center">
              <img
                className="h-[80px] w-[80px]"
                src="/svg/bubble.svg"
                alt="next"
              />
              {'무료 버블 10개 지급 완료!'}
            </div>
          ),
          onClose: () => {
            closeModal(AlertModal);
          },
        },
      });
    } catch (error: any) {
      methods.setError('invitationCode', {
        type: 'manual',
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InviteRegisterLayer />
      </form>
    </FormProvider>
  );
}
