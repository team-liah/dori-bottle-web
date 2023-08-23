import React, { Fragment } from 'react';
import Loading from '@/components/common/Loading';
import serverApi from '@/service/serverApi';

//#region Styled Component

//#endregion

export default function PaymentSuccess() {
  return (
    <Fragment>
      <Loading />
    </Fragment>
  );
}

export const getServerSideProps = async (context: any) => {
  const { query } = context;
  const { customerKey, authKey } = query;

  if (customerKey && authKey) {
    try {
      await serverApi.post(
        '/payment/method',
        {
          providerType: 'TOSS_PAYMENTS',
          customerKey,
          authKey,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${context.req.cookies.access_token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return {
        redirect: {
          destination: '/payment',
          permanent: true,
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: '/payment/toss/fail',
          permanent: false,
        },
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
};
