import useModals from './useModals';
import useToast from './useToast';
import AlertModal from '@/components/common/modal/AlertModal';
import { IPayment } from '@/types/payment';

const usePayment = () => {
  const { openToast } = useToast();
  const { openModal, closeModal } = useModals();
  // TODO: API 연동
  const paymentMethods: IPayment[] = [
    {
      id: 1,
      type: 'CREDIT',
      cardName: '신한카드',
      cardNum: '3477',
      isDefault: true,
    },
    {
      id: 2,
      type: 'KAKAO',
      isDefault: false,
    },
    {
      id: 3,
      type: 'NAVER',
      isDefault: false,
    },
  ];

  // TODO: API 연동
  const changeDefaultPayment = (payment: IPayment) => {
    console.log('select', payment);
  };

  // TODO: API 연동
  const removePayment = (payment: IPayment) => {
    if (payment.isDefault) {
      setTimeout(() => {
        openModal({
          component: AlertModal,
          props: {
            children:
              '대여 중인 컵이 있어\n결제수단을 삭제할 수 없습니다.\n컵을 먼저 반납해주세요!',
            confirmText: '닫기',
            onClose: () => closeModal(AlertModal),
          },
        });
      }, 0);
    } else {
      console.log('remove', payment);
    }
  };

  const addTossPayment = () => {
    console.log('addTossPayment');
  };

  const addKakaoPay = () => {
    openToast({
      component: '준비 중입니다.',
    });
  };

  const addNaverPay = () => {
    openToast({
      component: '준비 중입니다.',
    });
  };

  return {
    paymentMethods,
    changeDefaultPayment,
    removePayment,
    addTossPayment,
    addKakaoPay,
    addNaverPay,
  };
};

export default usePayment;
