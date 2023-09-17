import { useState } from 'react';

const useCallbackOnce = (cb) => {
  const [called, setCalled] = useState(false);

  // Below can be wrapped in useCallback whenever re-renders becomes a problem
  return (e) => {
    if (!called) {
      setCalled(true);
      cb(e);
    }
  };
};

export default useCallbackOnce;
