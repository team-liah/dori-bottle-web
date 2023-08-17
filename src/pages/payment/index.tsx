import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { Fragment } from 'react';
import PaymentLayer from '@/components/payment/PaymentLayer';

//#region Styled Component

//#endregion

export default function Payment({
  ssr,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Fragment>{ssr && <PaymentLayer />}</Fragment>;
}

// 서버 사이드 렌더링을 위한 임시 코드
export const getServerSideProps: GetServerSideProps = async () => {
  return { props: { ssr: true } };
};
