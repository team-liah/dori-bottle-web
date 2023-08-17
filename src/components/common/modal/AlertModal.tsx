import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';

interface IAlertModalProps {
  title?: string;
  children?: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  onClose: () => void;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-[calc(100vw-60px)]
  max-w-[310px]
  flex-col
  items-center
  bg-white
  p-9
  pt-[42px]
  shadow-md
`;

const TitleText = tw.div`
  mb-7
  whitespace-pre
  text-center
  text-[20px]
  font-bold
  leading-[26px]
  text-gray1
`;

const DescriptionText = tw.div`
  whitespace-pre
  text-center
  text-[16px]
  font-medium
  tracking-[-0.48px]
  text-gray1
`;

const ButtomWrapper = tw.div`
  mt-8
  flex
  w-full
  flex-row
  items-center
  justify-between
  gap-3
`;

const Button = tw(Custom.Button)`
  w-auto
  max-w-[120px]
  flex-1
  h-[48px]
  mx-auto
`;

//#endregion

const AlertModal = ({
  title,
  children,
  confirmText = '확인',
  onConfirm,
  onClose,
}: IAlertModalProps) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Wrapper>
      {title && <TitleText>{title}</TitleText>}
      <DescriptionText>{children}</DescriptionText>
      <ButtomWrapper>
        {onConfirm && (
          <Button $style="disable" onClick={onClose}>
            취소
          </Button>
        )}
        <Button onClick={handleConfirm}>{confirmText}</Button>
      </ButtomWrapper>
    </Wrapper>
  );
};

export default AlertModal;
