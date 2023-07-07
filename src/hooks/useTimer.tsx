import { useCallback, useEffect, useState } from 'react';

const useTimer = (timer: number) => {
  const [seconds, setSeconds] = useState(timer);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds === 0) clearInterval(interval);

    return () => clearInterval(interval);
  }, [seconds]);

  const handleSeconds = useCallback((newSeconds: number) => {
    setSeconds(newSeconds);
  }, []);

  return {
    seconds,
    handleSeconds,
  };
};

export default useTimer;
