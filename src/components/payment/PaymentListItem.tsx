import React from 'react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { PiX } from 'react-icons/pi';
import tw from 'tailwind-styled-components';
import { IPayment } from '@/types/payment';

interface IPaymentListItemProps {
  payment: IPayment;
  onClick: () => void;
  onRemove: () => void;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-row
  items-center
  justify-between
  rounded-[10px]
  bg-white
  p-4
  shadow-[0_0_5px_0px_rgba(17,17,17,0.15)]
  transition-all
  duration-100
`;

const SelectWrapper = tw.div`
  flex
  flex-row
  items-center
  gap-2
`;

const DeleteButton = tw(PiX)`
  text-[20px]
  text-main-text
`;

const Radio = tw(MdRadioButtonUnchecked)`
  h-[20px]
  w-[20px]
  text-[#767676]
`;

const RadioSelected = tw(MdRadioButtonChecked)`
  h-[20px]
  w-[20px]
  text-main-blue
`;

const Icon = tw.img`
  h-[20px]
  w-[50px]
`;

//#endregion

const PaymentListItem = ({
  payment,
  onClick,
  onRemove,
}: IPaymentListItemProps) => {
  return (
    <Wrapper onClick={onClick}>
      <SelectWrapper>
        {payment.isDefault ? <RadioSelected /> : <Radio />}
        {payment.type === 'CREDIT' && (
          <div>{`${payment.cardName}(${payment.cardNum})`}</div>
        )}
        {payment.type === 'KAKAO' && (
          <Icon src="/svg/kakao_pay.svg" alt="bubble" />
        )}
        {payment.type === 'NAVER' && (
          <Icon src="/svg/naver_pay.svg" alt="bubble" />
        )}
      </SelectWrapper>
      <DeleteButton
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      />
    </Wrapper>
  );
};

export default PaymentListItem;
