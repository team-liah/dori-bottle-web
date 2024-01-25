import { useEffect, useRef } from 'react';
import OneSignal from 'react-onesignal';

const useOneSignal = () => {
  const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
  const onesignalInitializingRef = useRef(false);

  useEffect(() => {
    const init = async () => {
      try {
        if (!appId) throw new Error('OneSignal App ID not found');
        if (!onesignalInitializingRef.current) {
          console.log('Initializing OneSignal');
          onesignalInitializingRef.current = true;
          await OneSignal.init({
            appId,
            allowLocalhostAsSecureOrigin: true,
            notifyButton: {
              enable: true,
              size: 'large',
            },
            serviceWorkerParam: { scope: '/onesignal' },
          });
        }
      } catch (e) {
        console.error('OneSignal Initilization', e);
      } finally {
        onesignalInitializingRef.current = false;
      }
    };

    init();
  }, [appId]);
};

export default useOneSignal;
