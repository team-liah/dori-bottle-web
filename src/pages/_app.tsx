import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Modal from '@/components/common/Modal';
import ModalProvider from '@/context/ModalContext';

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
