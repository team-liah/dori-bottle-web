import { motion } from 'framer-motion';
import React, { Fragment } from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import usePayment from '@/hooks/usePayment';
import { PaymentType } from '@/types/payment';

interface IPaymentCreatModalProps {
  onClose: () => void;
}

//#region Styled Component

const SelectList = tw(motion.div)`
  pt-[30px]
  px-5
  bg-white
  flex
  flex-col
  gap-2
`;

const KakaoButton = tw(Custom.Button)`
  bg-[#FEE500]
  border-none
  text-gray1
  flex
  flex-row
  items-center
  gap-1
`;

const NaverButton = tw(Custom.Button)`
  bg-[#2DB400]
  border-none
  text-gray1
  flex
  flex-row
  items-center
  gap-1
`;

const Icon = tw.img`
  h-[20px]
  w-[50px]
`;

//#endregion

const PaymentCreatModal = ({ onClose }: IPaymentCreatModalProps) => {
  const MULTIPLE_PAYMENT = false;

  const { addTossPayment, addKakaoPay, addNaverPay } = usePayment();

  const handleAddPayment = (paymentType: PaymentType) => {
    switch (paymentType) {
      case 'CARD':
        addTossPayment();
        onClose();
        break;
      case 'KAKAO':
        addKakaoPay();
        onClose();
        break;
      case 'NAVER':
        addNaverPay();
        onClose();
        break;
      default:
        break;
    }
  };

  return (
    <SelectList>
      <Custom.Button onClick={() => handleAddPayment('CARD')}>
        신용카드 추가
      </Custom.Button>
      {MULTIPLE_PAYMENT && (
        <Fragment>
          <KakaoButton onClick={() => handleAddPayment('KAKAO')}>
            <Icon src="/svg/kakao_pay.svg" alt="kakaopay" />
            추가
          </KakaoButton>
          <NaverButton onClick={() => handleAddPayment('NAVER')}>
            <Icon src="/svg/naver_pay.svg" alt="naverpay" />
            추가
          </NaverButton>
        </Fragment>
      )}
    </SelectList>
  );
};

export default PaymentCreatModal;
