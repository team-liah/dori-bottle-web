import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import tw from 'tailwind-styled-components';
import ToolTip from '../common/ToolTip';
import Layer from '@/components/common/Layer';
import { fetcher } from '@/service/fetch';
import { IProfile } from '@/types/user';

//#region Styled Component

const Wrapper = tw.div`
  w-full
  pt-6
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

const Button = tw.button<{ $style?: 'default' | 'primary' }>`
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
      : 'text-gray2 bg-back-color'}
`;
//#endregion

const MypageLayer = () => {
  const { data: profile } = useQuery<IProfile>({
    queryKey: ['me'],
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
              <Button>번호 변경</Button>
            </InfoText>
          </InfoWrapper>
          <InfoWrapper>
            <InfoLabelText>기관인증</InfoLabelText>
            <InfoText $disabled={!profile?.group}>
              <span>
                {profile?.group?.name || '기관이 등록되어 있지 않습니다'}
              </span>
              <Button $style="primary">인증하기</Button>
            </InfoText>
          </InfoWrapper>
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
              {Array.from({ length: profile?.penaltyCount || 0 }).map(
                (_item, index) => (
                  <AlertCardIcon
                    key={index}
                    src="/svg/alert_card.svg"
                    alt="alert"
                  />
                ),
              )}
            </AlertCardWrapper>
          </InfoWrapper>
        </BottomWrapper>
      </Wrapper>
    </Layer>
  );
};

export default MypageLayer;
