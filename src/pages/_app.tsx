import '@/styles/base.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { Noto_Sans_KR } from 'next/font/google';
import Head from 'next/head';
import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import { AuthProvider } from '@/context/AuthContext';
import FloatingProvider from '@/context/FloatingContext';
import 'dayjs/locale/ko';

const font = Noto_Sans_KR({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
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
              <main className={font.className}>
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
