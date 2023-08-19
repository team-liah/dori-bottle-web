import axios from 'axios';
import getConfig from 'next/config';
import React, { Fragment } from 'react';
import Loading from '@/components/common/Loading';

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
  // TODO: 리팩토링 필요
  const { query } = context;
  const { customerKey, authKey } = query;
  const { serverRuntimeConfig } = getConfig();

  if (customerKey && authKey) {
    try {
      await axios.post(
        `${serverRuntimeConfig.baseApiUrl}/api/v1/payment/method`,
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
