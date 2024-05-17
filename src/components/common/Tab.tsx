import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import { ITab } from '@/types/common';

type TabStyle = 'default' | 'underline';
interface ITabProps {
  tabs: ITab[];
  tabStyle?: TabStyle;
}

//#region Styled Components

const Wrapper = tw(Custom.MobileWrapper)`
  flex
  flex-col
  px-0
`;

const TabButtonContainer = tw.div`
  w=full
  m-4
  flex
  max-h-[44px]
  min-h-[44px]
  flex-row
  rounded-full
  border-solid
  bg-point-yellow
  p-1
`;

const TabButton = tw.button<{ $active: boolean }>`
  relative
  flex-1
  py-2
  text-[16px]
  leading-[22px]
  tracking-[-0.48px]
  transition
  ${({ $active }) => ($active ? 'text-gray2 font-medium' : 'text-white')}
`;

const SelectCircle = tw(motion.div)`
  absolute
  w-full
  top-0
  h-[36px]
  bg-white
  rounded-full
`;

const UnderlineTabButtonContainer = tw.div`
  w=full
  flex
  flex-row
  border-b-[2px]
  border-solid
  border-back-line
`;

const UnderlineTabButton = tw.button<{ $active: boolean }>`
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

const Tab = ({ tabs, tabStyle = 'default' }: ITabProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ITab>(
    tabs.find((tab) => tab.id === router.query.tab) || tabs[0],
  );
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const handleClickTab = useCallback(
    (tab: ITab) => {
      setActiveTab(tab);
      router.push(`${router.pathname}?tab=${tab.id}`, undefined, {
        shallow: true,
      });
    },
    [router],
  );

  const handleTouchMove = useCallback(() => {
    if (touchStart.x - touchEnd.x < -75) {
      const newActiveTab =
        tabs.indexOf(activeTab) === 0
          ? tabs[tabs.length - 1]
          : tabs[tabs.indexOf(activeTab) - 1];
      setActiveTab(newActiveTab);
      router.push(`${router.pathname}?tab=${newActiveTab.id}`, undefined, {
        shallow: true,
      });
    } else if (touchStart.x - touchEnd.x > 75) {
      const newActiveTab =
        tabs.indexOf(activeTab) === tabs.length - 1
          ? tabs[0]
          : tabs[tabs.indexOf(activeTab) + 1];
      setActiveTab(newActiveTab);
      router.push(`${router.pathname}?tab=${newActiveTab.id}`, undefined, {
        shallow: true,
      });
    }
  }, [activeTab, router, tabs, touchEnd.x, touchStart.x]);

  useEffect(() => {
    setActiveTab(tabs.find((tab) => tab.id === router.query.tab) || tabs[0]);
  }, [router.query.tab, tabs]);

  useEffect(() => {
    handleTouchMove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchEnd]);

  return tabStyle === 'default' ? (
    <Wrapper
      onTouchStart={(e) =>
        setTouchStart({
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY,
        })
      }
      onTouchEnd={(e) => {
        setTouchEnd({
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY,
        });
      }}
    >
      <TabButtonContainer>
        {tabs.map((tab) => (
          <TabButton
            $active={activeTab?.id === tab.id}
            key={tab.id}
            onClick={() => handleClickTab(tab)}
          >
            {activeTab?.id === tab.id && <SelectCircle layoutId="selected" />}
            <div className="relative">{tab.title}</div>
          </TabButton>
        ))}
      </TabButtonContainer>
      {activeTab?.children}
    </Wrapper>
  ) : (
    <Wrapper
      onTouchStart={(e) =>
        setTouchStart({
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY,
        })
      }
      onTouchEnd={(e) => {
        setTouchEnd({
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY,
        });
      }}
    >
      <UnderlineTabButtonContainer>
        {tabs.map((tab) => (
          <UnderlineTabButton
            $active={activeTab?.id === tab.id}
            key={tab.id}
            onClick={() => handleClickTab(tab)}
          >
            {activeTab?.id === tab.id && <Underline layoutId="selected" />}
            {tab.title}
          </UnderlineTabButton>
        ))}
      </UnderlineTabButtonContainer>
      {activeTab?.children}
    </Wrapper>
  );
};

export default Tab;
