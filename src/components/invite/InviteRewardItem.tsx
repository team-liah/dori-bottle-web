import React from 'react';
import tw from 'tailwind-styled-components';

interface IInviteRewardItemProps {
  text: string;
  inviteCount: number;
  activated?: boolean;
}
//#region Styled Component

const Wrapper = tw.div<{ $activated?: boolean }>`
  relative
  flex
  h-[110px]
  w-[110px]
  items-center
  justify-center
  bg-contain
  bg-center
  bg-no-repeat
  ${({ $activated }) =>
    $activated
      ? 'bg-[url(/svg/reward_activated.svg)]'
      : 'bg-[url(/svg/reward_inactivated.svg)]'}
`;

const InviteCountText = tw.div`
  absolute
  bottom-0
  flex
  min-h-[24px]
  w-10
  items-center
  justify-center
  rounded-[5px]
  bg-main-blue
  text-[12px]
  font-bold
  text-white
`;

const RewardText = tw.div`
  whitespace-pre-line
  text-center
  text-[14px]
  font-bold
  tracking-[-0.28px]
  text-white
`;

//#endregion

const InviteRewardItem = ({
  text,
  inviteCount,
  activated,
}: IInviteRewardItemProps) => {
  return (
    <Wrapper $activated={activated}>
      <RewardText>{text}</RewardText>
      <InviteCountText>{`${inviteCount}명`}</InviteCountText>
    </Wrapper>
  );
};

export default InviteRewardItem;
