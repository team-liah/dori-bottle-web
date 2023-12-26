import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BiCheckCircle } from 'react-icons/bi';
import tw from 'tailwind-styled-components';
import Input from '../common/Input';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';
import { ILeaveFormInputs } from '@/types/user';

interface ILeaveInputLayerProps {
  onClickBack: () => void;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  h-[calc(100vh-12rem)]
  w-full
  flex-col
  items-center
  justify-between
  gap-7
  pt-10
`;

const Title = tw.div`
  mb-1
  whitespace-pre-line
  text-center
  text-[24px]
  font-bold
  leading-[32px]
  tracking-[-0.72px]
  text-main-text
`;

const Icon = tw.img`
  h-[80px]
  self-end
`;

const ButtonWrapper = tw.div`
  flex
  w-full
  flex-row
  gap-2
`;

const CheckButtonWrapper = tw.div`
  flex
  cursor-pointer
  flex-row
  items-center
  gap-2
`;

const CheckText = tw.span`
  text-[14px]
  font-medium
  tracking-[-0.48px]
  text-gray1
`;

const CheckCircleIcon = tw(BiCheckCircle)<{ $checked?: boolean }>`
  w-[20px]
  h-[20px]
  ${(props) => (props.$checked ? 'text-main-blue' : 'text-unactivated')}
  transition-colors
`;

//#endregion

const LeaveInputLayer = ({ onClickBack }: ILeaveInputLayerProps) => {
  const router = useRouter();
  const { control, formState, watch } = useFormContext<ILeaveFormInputs>();

  return (
    <Layer
      title="탈퇴하기"
      scrollable={true}
      onClickBack={onClickBack}
      footer={
        <ButtonWrapper>
          <Custom.Button
            type="submit"
            $style="primary"
            className="bg-point-yellow"
            disabled={!watch('agreedTermsOfLeave') || formState.isSubmitting}
          >
            탈퇴하기
          </Custom.Button>
          <Custom.Button type="button" onClick={() => router.push('/')}>
            홈으로
          </Custom.Button>
        </ButtonWrapper>
      }
    >
      <Wrapper>
        <div className="flex w-full flex-col items-center gap-7">
          <Title>도리보틀을 떠나시는 건가요..?</Title>
          <Controller
            name="reason"
            control={control}
            rules={{
              required: '탈퇴 사유를 입력해주세요.',
            }}
            render={({ field }) => (
              <Input
                id="reason"
                placeholder="탈퇴하는 이유를 알려주세요 :)"
                maxLength={50}
                autoFocus={true}
                error={formState.errors.reason?.message}
                field={field}
              />
            )}
          />
        </div>
        <div className="flex w-full flex-col items-center gap-8">
          <Icon src="/assets/character-down.png" />
          <Controller
            name="agreedTermsOfLeave"
            control={control}
            render={({ field }) => (
              <CheckButtonWrapper onClick={() => field.onChange(!field.value)}>
                <CheckCircleIcon $checked={field.value} />
                <CheckText>회원탈퇴 주의사항을 모두 확인하였습니다.</CheckText>
              </CheckButtonWrapper>
            )}
          />
        </div>
      </Wrapper>
    </Layer>
  );
};

export default LeaveInputLayer;
