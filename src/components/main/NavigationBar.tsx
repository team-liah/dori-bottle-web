import Link from 'next/link';
import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { PiBell } from 'react-icons/pi';
import tw from 'tailwind-styled-components';
import RightMenuBar from './RightMenuBar';
import useAuth from '@/hooks/useAuth';

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-row
  items-center
  justify-between
  pb-9
`;

const NotificationButton = tw.div`
  relative
`;

const BellIcon = tw(PiBell)`
  w-[24px]
  h-[24px]
  text-black
`;

const NotificationBadge = tw.div`
  absolute
  top-[-2px]
  right-[-2px]
  h-[6px]
  w-[6px]
  animate-pulse
  rounded-full
  bg-main-blue
`;

const MenuButton = tw(BiMenu)`
  w-[24px]
  h-[24px]
  text-black
  cursor-pointer
`;

//#endregion

const NavigationBar = () => {
  const { user } = useAuth();
  const [rightMenu, setRightMenu] = useState(false);

  const toggleRightMenu = () => {
    setRightMenu((current) => !current);
  };

  return (
    <Wrapper>
      <Link href={'/notification'}>
        <NotificationButton>
          <BellIcon />
          {user && user?.alertCount > 0 && <NotificationBadge />}
        </NotificationButton>
      </Link>
      <img src="/svg/text_logo.svg" alt="Dori Bottle" />
      <MenuButton onClick={toggleRightMenu} />
      <RightMenuBar open={rightMenu} onClose={toggleRightMenu} />
    </Wrapper>
  );
};

export default NavigationBar;
