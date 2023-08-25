import { useCallback } from 'react';
import useModals from './useModals';
import useToast from './useToast';
import InstallationModal from '@/components/common/modal/InstallationModal';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
const useInstalltaion = () => {
  const { openToast } = useToast();
  const { openModal, closeModal } = useModals();

  const handleClickShare = async () => {
    try {
      await navigator.share();
    } catch (error) {
      openToast({
        component: '현재 브라우저에서 지원하지 않습니다.',
      });
    }
  };

  const handleInstall = useCallback(
    async (deferredPrompt: BeforeInstallPromptEvent) => {
      if (!deferredPrompt) {
        return;
      }
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    },
    [],
  );

  const handleBeforeInstallPrompt = useCallback(
    (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      openModal({
        position: 'bottom',
        component: InstallationModal,
        props: {
          onClickInstall: () => {
            handleInstall(e);
            closeModal(InstallationModal);
          },
          onClose: () => closeModal(InstallationModal),
        },
      });
    },
    [openModal, handleInstall, closeModal],
  );

  return { handleClickShare, handleBeforeInstallPrompt };
};

export default useInstalltaion;
