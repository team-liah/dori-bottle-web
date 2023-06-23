import React from 'react';
import TestToast from './TestToast';
import useToast from '@/hooks/useToast';

interface ITestModalProps {
  onClose?: () => void;
}

//#region Styled Component

//#endregion

const TestModal = ({ onClose }: ITestModalProps) => {
  const { openToast } = useToast();
  const handleToast = (text: string) => {
    openToast({
      component: TestToast,
      props: { children: text },
    });
  };

  return (
    <div className="h-6 mx-0 flex w-full flex-col gap-5 bg-white">
      <span>
        <div className="h-4 w-4 cursor-pointer bg-green" onClick={onClose}>
          dd
        </div>
        <div
          className="cursor-pointer bg-purple p-4"
          onClick={() => handleToast('111111111')}
        >
          fsdafsdaasdfsdjsj
        </div>
      </span>
    </div>
  );
};

export default TestModal;
