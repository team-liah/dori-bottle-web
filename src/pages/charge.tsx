import React from 'react';
import * as Custom from '@/components/common/CustomStyledComponent';
import TestBottomModal from '@/components/test/TestBottomModal';
import useModals from '@/hooks/useModals';

//#region Styled Component

//#endregion

export default function Charge() {
  const { openModal, closeModal } = useModals();

  const handleClickTestBottomModal = () => {
    openModal({
      component: TestBottomModal,
      position: 'bottom',
      props: {
        onClose: () => closeModal(TestBottomModal),
      },
    });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-end px-5 py-8">
      <Custom.Button onClick={handleClickTestBottomModal}>
        로그인/회원가입
      </Custom.Button>
    </div>
  );
}
