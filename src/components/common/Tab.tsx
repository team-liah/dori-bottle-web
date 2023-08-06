import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import { ITab } from '@/types/common';

interface ITabProps {
  tabs: ITab[];
}

//#region Styled Components

const Wrapper = tw(Custom.MobileWrapper)`
  flex
  flex-col
  px-0
`;

const TabButtonContainer = tw.div`
  w=full
  flex
  flex-row
  border-b-[2px]
  border-solid
  border-back-line
`;

const TabButton = tw.button<{ $active: boolean }>`
  relative
  flex-1
  py-2
  text-[16px]
  transition
  ${({ $active }) =>
    $active ? 'font-bold text-main-text' : 'font-medium text-gray2'}
`;

const Underline = tw(motion.div)`
  absolute
  bottom-[-2px]
  left-0
  w-full
  h-[2px]
  bg-main-blue
`;

//#endregion

const Tab = ({ tabs }: ITabProps) => {
  const [activeTab, setActiveTab] = useState<ITab>();
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const handleTouchMove = () => {
    if (touchStart.x - touchEnd.x < -75) {
      setActiveTab(
        (prev) =>
          prev &&
          (tabs.indexOf(prev) === 0
            ? tabs[tabs.length - 1]
            : tabs[tabs.indexOf(prev) - 1]),
      );
    } else if (touchStart.x - touchEnd.x > 75) {
      setActiveTab(
        (prev) =>
          prev &&
          (tabs.indexOf(prev) === tabs.length - 1
            ? tabs[0]
            : tabs[tabs.indexOf(prev) + 1]),
      );
    }
  };

  useEffect(() => {
    setActiveTab(tabs[0]);
  }, [tabs]);

  return (
    <Wrapper
      onTouchStart={(e) =>
        setTouchStart({
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY,
        })
      }
      onTouchMove={(e) =>
        setTouchEnd({
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY,
        })
      }
      onTouchEnd={() => handleTouchMove()}
    >
      <TabButtonContainer>
        {tabs.map((tab) => (
          <TabButton
            $active={activeTab?.id === tab.id}
            key={tab.id}
            onClick={() => setActiveTab(tab)}
          >
            {activeTab?.id === tab.id && <Underline layoutId="underline" />}
            {tab.title}
          </TabButton>
        ))}
      </TabButtonContainer>
      {activeTab?.children}
    </Wrapper>
  );
};

export default Tab;
