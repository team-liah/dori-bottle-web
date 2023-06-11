import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { ModalProvider } from '@/context/ModalContext';
import { SessionProvider } from 'next-auth/react';
import Modal from '@/components/common/Modal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ModalProvider>
        <Component {...pageProps} />
        <Modal />
      </ModalProvider>
    </SessionProvider>
  );
}
