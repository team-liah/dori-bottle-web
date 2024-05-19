import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AlertModal from '@/components/common/modal/AlertModal';
import InquiryCreateLayer from '@/components/faq/InquiryCreateLayer';
import useModals from '@/hooks/useModals';
import { IInquiryFormValue, createInquiry } from '@/types/inquiry';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

//#endregion

export default function InquiryCreate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModals();
  const methods = useForm<IInquiryFormValue>();

  const onSubmit = async () => {
    try {
      await createInquiry({
        ...methods.getValues(),
        type: 'ETC',
        target: methods.getValues('originTarget')
          ? {
              id: methods.getValues('originTarget')?.id as string,
              classType: 'RENTAL',
            }
          : undefined,
      });
      queryClient.invalidateQueries({
        queryKey: ['inquiry'],
      });
      openModal({
        component: AlertModal,
        props: {
          children: (
            <div>
              문의가 성공적으로 등록되었습니다.
              <br />
              답변은 1:1 문의하기 탭에서 확인해주세요.
            </div>
          ),
          onClose: () => {
            closeModal(AlertModal);
            router.back();
          },
        },
      });
    } catch (error: any) {
      methods.setError('content', {
        type: 'manual',
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InquiryCreateLayer />
      </form>
    </FormProvider>
  );
}
