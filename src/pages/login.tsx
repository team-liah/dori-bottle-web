import React from 'react';
import * as Custom from '@/components/common/CustomStyledComponent';
import TestModal from '@/components/test/TestModal';
import useModals from '@/hooks/useModals';

//#region Styled Component

//#endregion

export default function Login() {
  const { openModal, closeModal } = useModals();

  const handleClickTestModal = () => {
    openModal({
      component: TestModal,
      props: {
        onClose: () => closeModal(TestModal),
      },
    });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-end px-5 py-8">
      <Custom.Button onClick={handleClickTestModal}>
        로그인/회원가입
      </Custom.Button>
    </div>
  );
}
