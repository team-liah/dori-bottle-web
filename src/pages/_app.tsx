import '@/styles/base.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';
import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import { AuthProvider } from '@/context/AuthContext';
import FloatingProvider from '@/context/FloatingContext';
import 'dayjs/locale/ko';

const myFont = localFont({
  src: [
    {
      path: './SpoqaHanSansNeo-Thin.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './SpoqaHanSansNeo-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './SpoqaHanSansNeo-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './SpoqaHanSansNeo-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './SpoqaHanSansNeo-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>도리보틀</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <FloatingProvider>
            <AuthProvider>
              <main className={myFont.className}>
                <Component {...pageProps} />
                <Modal />
                <Toast />
              </main>
            </AuthProvider>
          </FloatingProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
