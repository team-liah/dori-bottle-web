import '@/styles/base.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import FloatingProvider from '@/context/FloatingContext';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <FloatingProvider>
          <Component {...pageProps} />
          <Modal />
          <Toast />
        </FloatingProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
