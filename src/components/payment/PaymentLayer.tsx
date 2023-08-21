import { useRouter } from 'next/router';
import React from 'react';
import { BiPlus } from 'react-icons/bi';
import tw from 'tailwind-styled-components';
import PaymentListItem from './PaymentListItem';
import PaymentCreatModal from '../common/modal/PaymentCreatModal';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';
import AlertModal from '@/components/common/modal/AlertModal';
import useModals from '@/hooks/useModals';
import usePayment from '@/hooks/usePayment';
import { IPaymentMethod } from '@/types/payment';

//#region Styled Component

const Wrapper = tw.div`
  flex
  h-[calc(100vh-40px)]
  w-full
  flex-col
  pt-8
`;

const TopWrapper = tw.div`
  flex
  w-full
  flex-col
  p-5
`;

const BottomWrapper = tw.div`
  mt-auto
  flex
  min-h-[100px]
  list-outside
  list-disc
  bg-back-color
  p-5
`;

const BulletTextContainer = tw.ul`
  flex
  list-outside
  list-disc
  flex-col
  gap-3
  pl-[20px]
`;

const BulletText = tw.li`
  text-[12px]
  text-main-text
`;

const PlusIcon = tw(BiPlus)`
  text-[20px]
  text-main-blue
  mr-1
`;

const PaymentListWrapper = tw.div`
  mt-6
  flex
  w-full
  flex-col
  gap-3
`;

//#endregion

const PaymentLayer = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModals();
  const { paymentMethods, changeDefaultPayment, removePayment } = usePayment();

  const openNewPaymentModal = () => {
    openModal({
      position: 'bottom',
      component: PaymentCreatModal,
      props: {
        onClose: () => closeModal(PaymentCreatModal),
      },
    });
  };

  const openRemoveModal = (payment: IPaymentMethod) => {
    openModal({
      component: AlertModal,
      props: {
        children: '결제수단을 삭제하시겠습니까?',
        confirmText: '삭제하기',
        onConfirm: () => removePayment(payment),
        onClose: () => closeModal(AlertModal),
      },
    });
  };

  return (
    <Layer
      title="결제수단 관리"
      fullScreen={true}
      onClickBack={() => router.push('/')}
    >
      <Wrapper>
        <TopWrapper>
          <Custom.Button $style="default" onClick={openNewPaymentModal}>
            <PlusIcon /> 결제수단 추가하기
          </Custom.Button>
          <PaymentListWrapper>
            {paymentMethods.map((item) => {
              return (
                <PaymentListItem
                  key={item.id}
                  payment={item}
                  onClick={() => changeDefaultPayment(item)}
                  onRemove={() => openRemoveModal(item)}
                />
              );
            })}
          </PaymentListWrapper>
        </TopWrapper>
        <BottomWrapper>
          <BulletTextContainer>
            <BulletText>
              반납하지 않은 컵이 있을 경우 기본 결제수단은 삭제할 수 없습니다.
            </BulletText>
          </BulletTextContainer>
        </BottomWrapper>
      </Wrapper>
    </Layer>
  );
};

export default PaymentLayer;
