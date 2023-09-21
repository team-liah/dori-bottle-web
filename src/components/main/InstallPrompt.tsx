import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { Dimmed } from '../common/CustomStyledComponent';
import Portal from '../common/Portal';
import InstallationModal from '../common/modal/InstallationModal';
import * as Custom from '@/components/common/CustomStyledComponent';
import { MOTION } from '@/constants/MotionConstants';
import useDeviceDetect from '@/hooks/useDeviceDetect';

//#region Styled Component

const Wrapper = tw.div`
  fixed
  left-0
  top-0
  z-[2000]
  flex
  h-screen
  w-screen
  items-center
  justify-center
  overflow-hidden
`;

const BottomSheetContainer = tw(motion.div)`
  w-full
  absolute
  bottom-0
  rounded-t-[25px]
  overflow-hidden
  bg-white
  pt-[10px]
  pb-[30px]
`;

const BottomSheetSlidebar = tw.div`
  absolute
  top-[10px]
  left-[50%]
  h-[4px]
  w-[10vw]
  -translate-x-1/2
  transform
  rounded-full
  bg-gray2
`;
//#endregion

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

const InstallPrompt = () => {
  const { isIos } = useDeviceDetect();
  const [isShown, setIsShown] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsShown(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (isIos && !window.matchMedia('(display-mode: standalone)').matches) {
      setIsShown(true);
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, [isIos]);

  const handleClick = async () => {
    setIsShown(false);
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
    setDeferredPrompt(null);
  };

  if (!isShown) {
    return null;
  }

  if (isIos) {
    return (
      <Portal>
        <AnimatePresence>
          <Wrapper>
            <Dimmed onClick={() => setIsShown(false)} />
            <BottomSheetContainer {...MOTION.POP}>
              <BottomSheetSlidebar />
              <div className="flex flex-col gap-4 px-5 pt-5 text-center">
                Safari의 공유 버튼을 눌러 홈 화면에 추가해주세요.
                <Custom.Button onClick={() => setIsShown(false)}>
                  확인
                </Custom.Button>
              </div>
            </BottomSheetContainer>
          </Wrapper>
        </AnimatePresence>
      </Portal>
    );
  }

  return (
    <Portal>
      <AnimatePresence>
        <Wrapper>
          <Dimmed onClick={() => setIsShown(false)} />
          <BottomSheetContainer {...MOTION.POP}>
            <BottomSheetSlidebar />
            <InstallationModal
              onClickInstall={handleClick}
              onClose={() => setIsShown(false)}
            />
          </BottomSheetContainer>
        </Wrapper>
      </AnimatePresence>
    </Portal>
  );
};

export default InstallPrompt;
