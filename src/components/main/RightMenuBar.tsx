import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import { MOTION } from '@/constants/MotionConstants';
import useAuth from '@/hooks/useAuth';
import useInstalltaion from '@/hooks/useInstallation';
import useToast from '@/hooks/useToast';

interface IMenuBarProps {
  open: boolean;
  onClose: () => void;
}

//#region Styled Component

const Wrapper = tw.div`
  fixed
  top-0
  right-0
  z-50
  flex
  h-screen
  w-screen
  justify-end
`;

const MenuWrapper = tw(motion.div)`
  h-full
  relative
  w-[239px]
  bg-white
  py-[75px]
  px-[32px]
`;

const ProfileWrapper = tw.div`
  mb-[24px]
  flex
  w-full
  flex-row
  items-center
  gap-[24px]
`;

const ProfileText = tw.div`
  h-[25px]
  text-[20px]
  font-medium
  text-gray1
`;

const ChevronRightIcon = tw(BiChevronRight)`
  w-[24px]
  h-[24px]
  text-gray1
  stroke-none
`;

const MenuListWrapper = tw.div`
  flex
  w-full
  flex-col
`;

const MenuItem = tw.div`
  w-full
  py-[16px]
  text-[18px]
  font-medium
  text-gray1
`;

const MenuItemSmall = tw(MenuItem)`
  text-[16px]
  py-[12px]
`;

const Divider = tw.div`
  mt-[11px]
  mb-[15px]
  h-[1px]
  w-full
  bg-[#B9B9B9]
`;

//#endregion

const RightMenuBar = ({ open, onClose }: IMenuBarProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { openToast } = useToast();
  const { logout } = useAuth();
  const { handleClickShare } = useInstalltaion();

  const openPreparingToast = () => {
    openToast({
      component: '준비 중입니다.',
    });
  };

  const onClickLogout = () => {
    logout();
    router.push('/login');
  };

  const menuList = [
    {
      title: '결제수단',
      onClick: () => router.push('/payment'),
    },
    {
      title: '버블충전',
      onClick: () => router.push('/charge'),
    },
    {
      title: '이용내역',
      onClick: () => router.push('/rental'),
    },
    {
      title: '결제내역',
      onClick: () => router.push('/payment/history'),
    },
    {
      title: '이용방법',
      onClick: () => router.push('/guide'),
    },
    {
      title: '초대장',
      onClick: openPreparingToast,
    },
  ];

  const menuListSmall = [
    {
      title: '공지사항',
      onClick: () => router.push('/notice'),
    },
    {
      title: '문의하기',
      onClick: openPreparingToast,
    },
    {
      title: '홈 화면에 아이콘 추가',
      onClick: () => handleClickShare(),
    },
    {
      title: '로그아웃',
      onClick: onClickLogout,
    },
  ];

  return (
    <Fragment>
      <AnimatePresence>
        {open && (
          <Wrapper>
            <Custom.Dimmed onClick={onClose} />
            <MenuWrapper {...MOTION.DRAWER}>
              <Link href="/mypage">
                <ProfileWrapper>
                  <ProfileText>{user?.name}님</ProfileText>
                  <ChevronRightIcon />
                </ProfileWrapper>
              </Link>
              <MenuListWrapper>
                {menuList.map((item) => (
                  <MenuItem key={item.title} onClick={item.onClick}>
                    {item.title}
                  </MenuItem>
                ))}
                <Divider />
                {menuListSmall.map((item) => (
                  <MenuItemSmall key={item.title} onClick={item.onClick}>
                    {item.title}
                  </MenuItemSmall>
                ))}
              </MenuListWrapper>
            </MenuWrapper>
          </Wrapper>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default RightMenuBar;
