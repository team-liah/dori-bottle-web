import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import tw from 'tailwind-styled-components';
import ToolTip from '../common/ToolTip';
import Layer from '@/components/common/Layer';
import { fetcher } from '@/service/fetch';
import { IUser } from '@/types/user';
import { getPenaltyTypeLabel } from '@/utils/util';

//#region Styled Component

const Wrapper = tw.div`
  flex
  h-[80vh]
  w-full
  flex-col
`;

const NameText = tw.div`
  w-full
  p-5
  text-[24px]
  font-bold
  tracking-[-0.72px]
  text-main-text
`;

const Divider = tw.div`
  h-[6px]
  w-full
  bg-back-color
`;

const BottomWrapper = tw.div`
  flex
  w-full
  flex-col
  gap-[30px]
  px-5
  py-[30px]
`;

const InfoWrapper = tw.div`
  flex
  w-full
  flex-col
  gap-3
`;

const InfoLabelText = tw.div`
  flex
  flex-row
  items-center
  gap-1
  text-[16px]
  font-medium
  leading-[22px]
  tracking-[-0.48px]
  text-gray1
`;

const InfoText = tw.div<{ $disabled?: boolean }>`
  border-1
  relative
  flex
  h-[58px]
  w-full
  items-center
  justify-between
  rounded-[15px]
  border
  border-unactivated
  px-5
  ${({ $disabled }) =>
    $disabled && 'border-none bg-back-color text-unactivated'}
`;

const AlertCardWrapper = tw.div`
  flex
  flex-row
  items-center
  gap-2
`;

const QuestionIcon = tw(AiOutlineQuestionCircle)`
  text-unactivated
  h-[15px]
  w-[15px]
`;

const AlertCardIcon = tw.img`
  h-[29px]
  w-[21px]
`;

const Button = tw.button<{ $style?: 'default' | 'primary' | 'yellow' }>`
  flex
  h-[30px]
  w-[75px]
  items-center
  justify-center
  rounded-[15px]
  text-[12px]
  font-normal
  leading-normal
  ${({ $style }) =>
    $style === 'primary'
      ? 'text-white bg-main-blue'
      : $style === 'yellow'
      ? 'text-white bg-yellow'
      : 'text-gray2 bg-back-color'}
`;

const YellowInfoWrapper = tw(InfoWrapper)`
  flex
  flex-row
  items-center
  justify-between
  bg-[#FFF1D6]
  rounded-[15px]
  px-5
  py-[14px]
  text-[16px]
  font-medium
  leading-[22px]
  tracking-[-0.48px]
  text-gray1
`;

const LeaveLink = tw.div`
  mt-auto
  flex
  cursor-pointer
  items-center
  justify-center
  text-[12px]
  font-medium
  leading-[22px]
  tracking-[-0.36px]
  text-unactivated
  underline
`;
//#endregion

const MypageLayer = () => {
  const router = useRouter();
  const { data: profile } = useQuery<IUser>({
    queryKey: ['profile'],
    queryFn: () => fetcher('/api/me/profile'),
  });

  return (
    <Layer title="내 정보" fullScreen={true}>
      <Wrapper>
        <NameText>{profile?.name} 님</NameText>
        <Divider />
        <BottomWrapper>
          <InfoWrapper>
            <InfoLabelText>전화번호</InfoLabelText>
            <InfoText>
              <span>{profile?.loginId}</span>
              <Link href="/mypage/change">
                <Button>번호 변경</Button>
              </Link>
            </InfoText>
          </InfoWrapper>
          <InfoWrapper>
            <InfoLabelText>기관인증</InfoLabelText>
            <InfoText $disabled={!profile?.group}>
              <span>
                {profile?.group?.name || '기관이 등록되어 있지 않습니다'}
              </span>
              <Link href="/mypage/department">
                <Button $style="primary">인증하기</Button>
              </Link>
            </InfoText>
          </InfoWrapper>
          <YellowInfoWrapper>
            탄소중립실천포인트
            <Button
              $style="yellow"
              onClick={() => router.push('/mypage/cpoint')}
            >
              참여하기
            </Button>
          </YellowInfoWrapper>
          <InfoWrapper>
            <InfoLabelText>
              레드카드
              <ToolTip
                toolTip={
                  '레드카드 5장이 부여되면 블락\n처리되어 이용이 제한됩니다'
                }
              >
                <QuestionIcon />
              </ToolTip>
            </InfoLabelText>
            <AlertCardWrapper>
              {profile?.penalties?.map((item, index) => (
                <ToolTip
                  key={index}
                  toolTipStyle="warning"
                  toolTip={
                    <span className="whitespace-pre">{`${getPenaltyTypeLabel(
                      item.type,
                    )}\n(${dayjs(item.createdDate).format('YY.MM.DD')})`}</span>
                  }
                >
                  <AlertCardIcon src="/svg/alert_card.svg" alt="alert" />
                </ToolTip>
              ))}
            </AlertCardWrapper>
          </InfoWrapper>
        </BottomWrapper>
        <LeaveLink>
          <Link href="/mypage/leave">회원 탈퇴하기</Link>
        </LeaveLink>
      </Wrapper>
    </Layer>
  );
};

export default MypageLayer;
