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

const Wrapper = tw.div`
  flex
  flex-col
  items-center
  gap-6
  bg-white
  px-9
  pt-[30px]
`;

const SelectList = tw(motion.div)`
  bg-white
  flex
  flex-col
  gap-[10px]
  w-full
`;

const Title = tw.div`
  text-cemter
  text-[20px]
  font-medium
  text-main-text

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
    <Wrapper>
      <Title>이용 전 결제수단 등록이 필요해요</Title>
      <SelectList>
        <Custom.Button onClick={() => handleAddPayment('CARD')}>
          신용/체크카드
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
    </Wrapper>
  );
};

export default PaymentCreatModal;
