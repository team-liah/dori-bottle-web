import { IPayment } from '@/types/payment';

const usePayment = () => {
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

  const addTossPayment = () => {
    console.log('addTossPayment');
  };

  const selectTossPayment = () => {
    console.log('selectTossPayment');
  };

  return {
    paymentMethods,
    addTossPayment,
    selectTossPayment,
  };
};

export default usePayment;
