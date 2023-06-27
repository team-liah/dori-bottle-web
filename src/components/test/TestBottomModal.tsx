import React from 'react';
import TestModal from './TestModal';
import TestToast from './TestToast';
import useModals from '@/hooks/useModals';
import useToast from '@/hooks/useToast';

interface ITestBottomModalProps {
  onClose?: () => void;
}

//#region Styled Component

//#endregion

const TestBottomModal = ({ onClose }: ITestBottomModalProps) => {
  const { openModal, closeModal } = useModals();
  const { openToast } = useToast();
  const handleToast = (text: string) => {
    openToast({
      component: TestToast,
      props: { children: text },
    });
  };

  const handleClickBottomModal = () => {
    openModal({
      component: TestModal,
      props: {
        onClose: () => closeModal(TestModal),
      },
    });
  };

  return (
    <div className="h-6 mx-0 flex w-full flex-col gap-5 bg-white">
      <span>
        <div className="h-4 w-4 cursor-pointer bg-green" onClick={onClose}>
          X
        </div>
        <div
          className="cursor-pointer bg-purple p-4"
          onClick={() => handleToast('111111111')}
        >
          Toast Test
        </div>
        <div
          className="cursor-pointer bg-purple p-4"
          onClick={handleClickBottomModal}
        >
          Modal Test
        </div>
      </span>
    </div>
  );
};

export default TestBottomModal;
