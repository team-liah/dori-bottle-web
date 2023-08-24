import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { BiPlus } from 'react-icons/bi';
import tw from 'tailwind-styled-components';
import PaymentListItem from './PaymentListItem';
import Error from '../common/Error';
import PaymentCreatModal from '../common/modal/PaymentCreatModal';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';
import AlertModal from '@/components/common/modal/AlertModal';
import useModals from '@/hooks/useModals';
import usePayment from '@/hooks/usePayment';
import useScroll from '@/hooks/useScroll';
import { fetcher } from '@/service/fetch';
import { IPaymentMethod, IPaymentMethodList } from '@/types/payment';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

const Wrapper = tw.div`
  flex
  h-[calc(100dvh-40px)]
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
  const { changeDefaultPayment, removePayment } = usePayment();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { handleScroll, isReachingEnd } = useScroll();
  const { data, error, fetchNextPage } = useInfiniteQuery<IPaymentMethodList>({
    queryKey: ['payment', 'method'],
    queryFn: ({ pageParam = 0 }) =>
      fetcher('/api/payment/method', {
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageable.hasNext) {
        return lastPage.pageable.page + 1;
      }
    },
  });

  useEffect(() => {
    if (isReachingEnd) {
      fetchNextPage();
    }
  }, [fetchNextPage, isReachingEnd]);

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
          {!!error && <Error message={getErrorMessage(error)} />}
          {data?.pages[0].content.length === 0 && (
            <Custom.Empty>아직 결제수단이 없어요</Custom.Empty>
          )}
          <PaymentListWrapper
            ref={scrollRef}
            onScroll={() =>
              scrollRef.current && handleScroll(scrollRef.current)
            }
          >
            {data?.pages.map((page) =>
              page.content.map((item) => (
                <PaymentListItem
                  key={item.id}
                  payment={item}
                  onClick={() => changeDefaultPayment(item)}
                  onRemove={() => openRemoveModal(item)}
                />
              )),
            )}
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
