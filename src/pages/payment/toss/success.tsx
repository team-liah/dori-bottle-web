// import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import getConfig from 'next/config';
import Link from 'next/link';
import React, { Fragment } from 'react';
import * as Custom from '@/components/common/CustomStyledComponent';
import Loading from '@/components/common/Loading';

//#region Styled Component

//#endregion

export default function PaymentSuccess({
  customerKey,
  authKey,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Fragment>
      <Loading />
      <div>{`customKey : ${customerKey}`}</div>
      <div>{`authKey : ${authKey}`}</div>
      <Link href="/payment">
        <Custom.Button>/Payment 화면으로</Custom.Button>
      </Link>
    </Fragment>
  );
}

export const getServerSideProps = async (context: any) => {
  // TODO: 리팩토링 필요
  const { query } = context;
  const { customerKey, authKey } = query;
  const { serverRuntimeConfig } = getConfig();

  if (customerKey && authKey) {
    // try {
    //   await axios.post(
    //     `${serverRuntimeConfig.baseApiUrl}/api/v1/payment/method`,
    //     {
    //       providerType: 'TOSS_PAYMENTS',
    //       customerKey,
    //       authKey,
    //     },
    //     {
    //       withCredentials: true,
    //       headers: {
    //         Authorization: `Bearer ${context.req.cookies.access_token}`,
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   );

    //   return {
    //     redirect: {
    //       destination: '/payment',
    //       permanent: true,
    //     },
    //   };
    // } catch (error) {
    //   return {
    //     redirect: {
    //       destination: '/payment/toss/fail',
    //       permanent: false,
    //     },
    //   };
    // }
    return {
      props: {
        serverRuntimeConfig,
        customerKey,
        authKey,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
