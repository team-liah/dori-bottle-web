import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import useAuth from './useAuth';
import useModals from './useModals';
import useToast from './useToast';
import AlertModal from '@/components/common/modal/AlertModal';
import api from '@/service/api';
import { IPaymentMethod } from '@/types/payment';
import { getErrorMessage } from '@/utils/error';

const usePayment = () => {
  const { user } = useAuth();
  const { openToast } = useToast();
  const { openModal, closeModal } = useModals();
  const queryClient = useQueryClient();

  const { mutate: changeDefaultPayment } = useMutation({
    mutationFn: (payment: IPaymentMethod) => {
      return api.post(`/api/payment/method/${payment.id}/default`);
    },
    onSuccess: () => queryClient.invalidateQueries(['payment', 'method']),
    onError: (error) => {
      openModal({
        component: AlertModal,
        props: {
          children: getErrorMessage(error),
          confirmText: '닫기',
          onClose: () => closeModal(AlertModal),
        },
      });
    },
  });

  const { mutate: removePayment } = useMutation({
    mutationFn: (payment: IPaymentMethod) => {
      return api.delete(`/api/payment/method/${payment.id}`);
    },
    onSuccess: () => queryClient.invalidateQueries(['payment', 'method']),
    onError: (error) => {
      openModal({
        component: AlertModal,
        props: {
          children: getErrorMessage(error),
          confirmText: '닫기',
          onClose: () => closeModal(AlertModal),
        },
      });
    },
  });

  const addTossPayment = async () => {
    if (process.env.NEXT_PUBLIC_TOSS_PAYMENT_CLIENT_KEY && user) {
      loadTossPayments(process.env.NEXT_PUBLIC_TOSS_PAYMENT_CLIENT_KEY).then(
        (tossPayments) => {
          // ------ 카드 등록창 호출 ------
          tossPayments
            .requestBillingAuth('카드', {
              // 결제수단 파라미터 (자동결제는 카드만 지원합니다.)
              // 결제 정보 파라미터
              // 더 많은 결제 정보 파라미터는 결제창 Javascript SDK에서 확인하세요.
              // https://docs.tosspayments.com/reference/js-sdk#requestbillingauth카드-결제-정보
              customerKey: user.id as string, // 고객 ID로 상점에서 만들어야 합니다. 빌링키와 매핑됩니다. 자세한 파라미터 설명은 결제 정보 파라미터 설명을 참고하세요.
              successUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/payment/toss/success`, // 카드 등록에 성공하면 이동하는 페이지(직접 만들어주세요)
              failUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/payment/toss/fail`, // 카드 등록에 실패하면 이동하는 페이지(직접 만들어주세요)
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
    changeDefaultPayment,
    removePayment,
    addTossPayment,
    addKakaoPay,
    addNaverPay,
  };
};

export default usePayment;
