import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiCheck, BiCopy } from 'react-icons/bi';
import tw from 'tailwind-styled-components';
import BubbleProgressBar from './BubbleProgressBar';
import InviteRewardItem from './InviteRewardItem';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';
import useToast from '@/hooks/useToast';
import { fetcher } from '@/service/fetch';
import { IProfile } from '@/types/user';
import { copyToClipboard } from '@/utils/util';

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-col
  items-center
  pt-10
`;

const Title = tw.div`
  whitespace-pre-line
  text-center
  text-[24px]
  font-bold
  leading-[32px]
  tracking-[-0.72px]
  text-main-text
`;

const SubTitle = tw.div`
  my-8
  flex
  w-full
  flex-col
  items-center
  justify-center
  gap-1
  whitespace-pre-line
  rounded-[20px]
  py-[22px]
  text-center
  text-[16px]
  font-medium
  leading-[22px]
  tracking-[-0.48px]
  text-gray1
  shadow-[0_0_5px_0px_rgba(17,17,17,0.15)]
`;

const LinkText = tw.div`
  mt-6
  cursor-pointer
  text-[14px]
  font-medium
  leading-[22px]
  tracking-[-0.42px]
  text-point-yellow
  underline
`;

const InvitationCode = tw.span`
  text-[20px]
  font-bold
  text-gray1
`;

const CopyIcon = tw(BiCopy)`
  text-unactivated
  inline-block
  ml-1
`;

const CheckIcon = tw(BiCheck)`
  text-green
  inline-block
  ml-1
`;

const RewardListWrapper = tw.div`
  flex
  w-full
  flex-row
  flex-wrap
  justify-center
  gap-[10px]
  pt-10
  pb-5
`;
//#endregion

const inviteRewardList = [
  {
    text: '버블\n5개',
    inviteCount: 5,
  },
  {
    text: '버블\n10개',
    inviteCount: 10,
  },
  {
    text: '버블\n30개',
    inviteCount: 25,
  },
  {
    text: '버블 10개\n6개월간 !',
    inviteCount: 50,
  },
  {
    text: '버블 20개\n6개월간 !',
    inviteCount: 100,
  },
];

const InviteLayer = () => {
  const router = useRouter();
  const { openToast } = useToast();
  const { data: profile } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: () => fetcher('/api/me/profile'),
  });

  const [copy, setCopy] = useState(false);

  const copyInvitecode = () => {
    copyToClipboard(profile?.invitationCode || '', () => {
      setCopy(true);
      openToast({
        component: '초대코드가 복사되었습니다.',
      });
    });
  };

  const shareInviteLink = () => {
    const shareTarget = `${window.location.origin}/login?invitationCode=${profile}`;
    if (navigator.share) {
      navigator.share({
        title: '도리보틀 초대장',
        url: shareTarget,
      });
    } else {
      copyToClipboard(shareTarget, () => {
        openToast({
          component: '링크가 복사되었습니다.',
        });
      });
    }
  };

  return (
    <Layer title="초대장" scrollable={true}>
      <Wrapper>
        <Title>{'친구랑 도리보틀하고\n무료 버블 받기'}</Title>
        {!profile?.inviterId &&
          dayjs(profile?.registeredDate).isAfter(
            dayjs().subtract(14, 'day'),
          ) && (
            <LinkText onClick={() => router.push('/invite/register')}>
              초대코드 입력하고 버블받기
            </LinkText>
          )}
        <SubTitle>
          {
            '친구를 도리보틀에 초대하고\n친구가 첫 이용하면 카운트 수가 올라가요!'
          }
        </SubTitle>
        <BubbleProgressBar percent={profile?.invitationCount ?? 0} />
        <RewardListWrapper>
          {inviteRewardList.map((item) => (
            <InviteRewardItem
              key={item.inviteCount}
              {...item}
              activated={(profile?.invitationCount ?? 0) > item.inviteCount}
            />
          ))}
        </RewardListWrapper>
        <SubTitle onClick={copyInvitecode}>
          나의 초대코드
          <InvitationCode>
            {profile?.invitationCode}
            {copy ? <CheckIcon /> : <CopyIcon />}
          </InvitationCode>
        </SubTitle>
        <Custom.Button onClick={shareInviteLink}>
          초대링크 공유하기
        </Custom.Button>
      </Wrapper>
    </Layer>
  );
};

export default InviteLayer;
