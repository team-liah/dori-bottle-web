import { loadTossPayments } from '@tosspayments/payment-sdk';
import getConfig from 'next/config';
import useAuth from './useAuth';
import useModals from './useModals';
import useToast from './useToast';
import AlertModal from '@/components/common/modal/AlertModal';
import { IPaymentMethod } from '@/types/payment';

const usePayment = () => {
  const { user } = useAuth();
  const { openToast } = useToast();
  const { openModal, closeModal } = useModals();
  const { publicRuntimeConfig } = getConfig();
  // TODO: API 연동
  const paymentMethods: IPaymentMethod[] = [
    {
      id: 1,
      type: 'CREDIT',
      cardName: '신한카드',
      cardNum: '3477',
      isDefault: true,
    },
    // {
    //   id: 2,
    //   type: 'KAKAO',
    //   isDefault: false,
    // },
    // {
    //   id: 3,
    //   type: 'NAVER',
    //   isDefault: false,
    // },
  ];

  // TODO: API 연동
  const changeDefaultPayment = (payment: IPaymentMethod) => {
    console.log('select', payment);
  };

  // TODO: API 연동
  const removePayment = (payment: IPaymentMethod) => {
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

  const addTossPayment = async () => {
    if (publicRuntimeConfig?.tossPaymentClientKey && user) {
      loadTossPayments(publicRuntimeConfig?.tossPaymentClientKey).then(
        (tossPayments) => {
          // ------ 카드 등록창 호출 ------
          tossPayments
            .requestBillingAuth('카드', {
              // 결제수단 파라미터 (자동결제는 카드만 지원합니다.)
              // 결제 정보 파라미터
              // 더 많은 결제 정보 파라미터는 결제창 Javascript SDK에서 확인하세요.
              // https://docs.tosspayments.com/reference/js-sdk#requestbillingauth카드-결제-정보
              customerKey: user.id as string, // 고객 ID로 상점에서 만들어야 합니다. 빌링키와 매핑됩니다. 자세한 파라미터 설명은 결제 정보 파라미터 설명을 참고하세요.
              successUrl: `${publicRuntimeConfig?.hostUrl}/payment/toss/success`, // 카드 등록에 성공하면 이동하는 페이지(직접 만들어주세요)
              failUrl: `${publicRuntimeConfig?.hostUrl}/payment/toss/fail`, // 카드 등록에 실패하면 이동하는 페이지(직접 만들어주세요)
            })
            // ------ 결제창을 띄울 수 없는 에러 처리 ------
            // 메서드 실행에 실패해서 reject 된 에러를 처리하는 블록입니다.
            // 결제창에서 발생할 수 있는 에러를 확인하세요.
            // https://docs.tosspayments.com/reference/error-codes#결제창공통-sdk-에러
            .catch(function () {
              // if (error.code === 'USER_CANCEL') {
              //   // 결제 고객이 결제창을 닫았을 때 에러 처리
              //   window.location.href = '/payment';
              // } else {
              //   openToast({
              //     component: '결제수단 등록에 실패하였습니다.',
              //   });
              // }
              window.location.href = '/payment';
            });
        },
      );
    } else {
      openToast({
        component: '결제 서비스 준비 중입니다.',
      });
    }
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
