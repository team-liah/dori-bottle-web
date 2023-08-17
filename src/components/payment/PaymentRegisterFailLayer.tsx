import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import Error from '../common/Error';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-col
  pt-8
`;

//#endregion

const PaymentRegisterFailLayer = () => {
  const router = useRouter();
  const { query } = router;

  const handleRouterBack = () => {
    router.replace('/payment');
  };

  return (
    <Layer
      title="결제수단 관리"
      onClickBack={handleRouterBack}
      footer={
        <Custom.Button onClick={handleRouterBack}>이전으로</Custom.Button>
      }
    >
      <Wrapper>
        <Error message={(query?.message as string) || ''} />
      </Wrapper>
    </Layer>
  );
};

export default PaymentRegisterFailLayer;
