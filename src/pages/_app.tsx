import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import FloatingProvider from '@/context/FloatingContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <FloatingProvider>
        <Component {...pageProps} />
        <Modal />
        <Toast />
      </FloatingProvider>
    </SessionProvider>
  );
}
