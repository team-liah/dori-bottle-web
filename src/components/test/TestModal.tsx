import React from 'react';

interface ITestModalProps {
  onClose?: () => void;
}

//#region Styled Component

//#endregion

const TestModal = ({ onClose }: ITestModalProps) => {
  return (
    <div className="h-6 mx-0 flex w-full flex-col gap-5 bg-white">
      <span>
        <div className="h-4 w-4 cursor-pointer bg-green" onClick={onClose}>
          dd
        </div>
        fsdafsdaasdfsdjsj
      </span>
    </div>
  );
};

export default TestModal;
