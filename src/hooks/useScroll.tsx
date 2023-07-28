import { useState } from 'react';

const useScroll = () => {
  const [isReachingEnd, setIsReachingEnd] = useState(false);

  const handleScroll = (element: HTMLDivElement) => {
    const scrollHeight = element!.scrollHeight; // 화면에 보이지 않는 높이도 포함된 페이지의 총 높이
    const scrollTop = element!.scrollTop; // 스크롤 되어 보이지 않는 구간의 높이
    const clientHeight = element!.clientHeight; // 사용자에게 보여지는 페이지의 높이
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      // 페이지 끝에 도달하면
      setIsReachingEnd(true);
    } else {
      setIsReachingEnd(false);
    }
  };

  return { handleScroll, isReachingEnd };
};

export default useScroll;
