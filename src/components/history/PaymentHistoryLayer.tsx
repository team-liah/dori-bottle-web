import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import PaymentHistoryListItem from './PaymentHistoryListItem';
import {
  Divider,
  Empty,
  ProgressBar,
} from '@/components/common/CustomStyledComponent';
import Error from '@/components/common/Error';
import Layer from '@/components/common/Layer';
import Select from '@/components/common/Select';
import AlertModal from '@/components/common/modal/AlertModal';
import useModals from '@/hooks/useModals';
import useScroll from '@/hooks/useScroll';
import api from '@/service/api';
import { fetcher } from '@/service/fetch';
import {
  IPaymentHistory,
  IPaymentHistoryList,
  PaymentHistoryType,
} from '@/types/payment';
import { getErrorMessage } from '@/utils/error';

//#region Styled Component

const Wrapper = tw.div`
  h-full
  flex
  w-full
  flex-col
  justify-between
  pt-8
`;

const SelectWrapper = tw.div`
  px-5
`;

const RentalList = tw.div`
  mt-5
  flex
  h-[calc(100dvh-150px)]
  w-full
  flex-col
  overflow-y-scroll
`;

//#endregion

const selectItems = [
  { value: 'ALL', label: '전체내역' },
  { value: 'CHARGE', label: '버블 충전' },
  { value: 'LOST', label: '컵 분실' },
];

// TODO: Remove tempData
const tempData: IPaymentHistory[] = [
  {
    id: '0a0f8bd8-4f03-4c89-974c-d5c294b48358',
    paymentMethod: {
      id: 1,
      type: 'CREDIT',
      cardName: '신한카드',
      cardNum: '3477',
      isDefault: true,
    },
    userId: '0a0f8bd8-4f03-4c89-974c-d5c294b48352',
    price: 36000,
    amount: 100,
    remainingAmount: 100,
    type: 'CHARGE',
    createdDate: '2023-06-10T18:00:00',
  },
  {
    id: '0a0f8bd8-4f03-4c89-974c-d5c294b482458',
    paymentMethod: {
      id: 1,
      type: 'CREDIT',
      cardName: '신한카드',
      cardNum: '3477',
      isDefault: true,
    },
    userId: '0a0f8bd8-4f03-4c89-974c-d5c294b48352',
    price: 36000,
    amount: 100,
    remainingAmount: 100,
    type: 'CHARGE',
    refunded: true,
    createdDate: '2023-06-10T18:00:00',
  },
  {
    id: '0a0f8bd8-4f03-4c89-974c-d5c294bss8358',
    paymentMethod: {
      id: 1,
      type: 'CREDIT',
      cardName: '신한카드',
      cardNum: '3477',
      isDefault: true,
    },
    userId: '0a0f8bd8-4f03-4c89-974c-d5c294b48352',
    price: 8100,
    amount: 100,
    remainingAmount: 99,
    type: 'CHARGE',
    createdDate: '2023-02-25T18:00:00',
  },
  {
    id: '0a0f8bd8-4f03-4c89-974c-d5c221b48358',
    paymentMethod: {
      id: 1,
      type: 'CREDIT',
      cardName: '신한카드',
      cardNum: '3477',
      isDefault: true,
    },
    userId: '0a0f8bd8-4f03-4c89-974c-d5c294b4342',
    price: 5000,
    type: 'LOST',
    createdDate: '2023-01-20T18:00:00',
  },
];

const PaymentHistoryLayer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<PaymentHistoryType | 'ALL'>('ALL');
  const { openModal, closeModal } = useModals();

  const { handleScroll, isReachingEnd } = useScroll();
  const { data, isLoading, error, fetchNextPage } =
    useInfiniteQuery<IPaymentHistoryList>({
      queryKey: ['rental', status],
      queryFn: ({ pageParam = 0 }) =>
        fetcher('/api/payment/history', {
          page: pageParam,
          status: status !== 'ALL' ? status : '',
        }),
      getNextPageParam: (lastPage) => {
        if (lastPage.pageable.hasNext) {
          return lastPage.pageable.page + 1;
        }
      },
    });
  const openRefundModal = (history: IPaymentHistory) => {
    openModal({
      component: AlertModal,
      props: {
        children: '버블을 환불 하시겠습니까?',
        confirmText: '환불하기',
        onConfirm: () => handleRefund(history),
        onClose: () => closeModal(AlertModal),
      },
    });
  };

  const handleRefund = async (history: IPaymentHistory) => {
    try {
      await api.patch(`/api/payment/history/${history.id}/refund`);

      openModal({
        component: AlertModal,
        props: {
          children: '환불 처리가 완료되었습니다.',
          confirmText: '확인',
          onClose: () => closeModal(AlertModal),
        },
      });
    } catch (error) {
      openModal({
        component: AlertModal,
        props: {
          children: '환불 처리에 실패하였습니다.',
          confirmText: '확인',
          onClose: () => closeModal(AlertModal),
        },
      });
    }
  };

  useEffect(() => {
    if (isReachingEnd) {
      fetchNextPage();
    }
  }, [fetchNextPage, isReachingEnd]);

  return (
    <Layer title="결제내역" fullScreen={true}>
      <Wrapper>
        <SelectWrapper>
          <Select
            items={selectItems}
            value={status}
            onChange={(value) => setStatus(value as PaymentHistoryType | 'ALL')}
          />
        </SelectWrapper>
        <RentalList
          ref={scrollRef}
          onScroll={() => scrollRef.current && handleScroll(scrollRef.current)}
        >
          <Divider />
          {isLoading && <ProgressBar />}
          {!!error && <Error message={getErrorMessage(error)} />}
          {data?.pages[0].content.length === 0 && (
            <Empty>결제내역이 없어요</Empty>
          )}
          {data?.pages.map((page) =>
            page.content.map((history) => (
              <Fragment key={history.id}>
                <PaymentHistoryListItem
                  history={history}
                  onRefund={() => openRefundModal(history)}
                />
                <Divider />
              </Fragment>
            )),
          )}
          {tempData.map((history) => (
            <Fragment key={history.id}>
              <PaymentHistoryListItem
                history={history}
                onRefund={() => openRefundModal(history)}
              />
              <Divider />
            </Fragment>
          ))}
        </RentalList>
      </Wrapper>
    </Layer>
  );
};

export default PaymentHistoryLayer;
