import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BiCheckCircle, BiSolidChevronRight } from 'react-icons/bi';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';
import useToast from '@/hooks/useToast';
import { IRegisterFormInputs } from '@/types/user';

interface ITermsInputLayerProps {
  onClickBack: () => void;
}
//#region Styled Component

const Wrapper = tw.div`
  h-full
  flex
  w-full
  flex-col
  pt-14
`;

const Label = tw.label`
  mb-5
  text-[20px]
  font-medium
  tracking-[-0.6px]
  text-gray1
`;

const CheckCircleIcon = tw(BiCheckCircle)<{ $checked?: boolean }>`
  w-[20px]
  h-[20px]
  ${(props) => (props.$checked ? 'text-main-blue' : 'text-unactivated')}
  transition-colors
`;

const ChevronRightIcon = tw(BiSolidChevronRight)`
  w-[24px]
  h-[24px]
  text-main-text
  stroke-none
`;

const CheckAllIcon = tw(CheckCircleIcon)`
  w-[28px]
  h-[28px]
`;

const ListWrapper = tw.div`
  mt-3
  flex
  flex-col
  gap-[10px]
  border-t-[1px]
  border-solid
  border-unactivated
  px-3
  pt-5
`;

const ListItemWrapper = tw.div`
  flex
  flex-row
  items-center
  justify-between
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

const CheckAllText = tw(CheckText)`
  text-[16px]
`;

//#endregion

const TermsInputLayer = ({ onClickBack }: ITermsInputLayerProps) => {
  const { openToast } = useToast();
  const { control, watch, setValue } = useFormContext<IRegisterFormInputs>();

  const handleAllAgree = () => {
    if (
      !watch('agreedTermsOfService') ||
      !watch('agreedTermsOfPrivacy') ||
      !watch('agreedTermsOfMarketing')
    ) {
      setValue('agreedTermsOfService', true);
      setValue('agreedTermsOfPrivacy', true);
      setValue('agreedTermsOfMarketing', true);
    } else {
      setValue('agreedTermsOfService', false);
      setValue('agreedTermsOfPrivacy', false);
      setValue('agreedTermsOfMarketing', false);
    }
  };

  const handleDetailTerms = () => {
    openToast({
      component: '준비 중입니다.',
    });
  };

  return (
    <Layer
      title="약관동의"
      footer={
        <Custom.Button
          type="submit"
          disabled={
            !watch('agreedTermsOfService') || !watch('agreedTermsOfPrivacy')
          }
        >
          회원가입 하기
        </Custom.Button>
      }
      onClickBack={onClickBack}
    >
      <Wrapper>
        <Label>약관을 확인해주세요</Label>
        <CheckButtonWrapper onClick={handleAllAgree}>
          <CheckAllIcon
            $checked={
              watch('agreedTermsOfService') &&
              watch('agreedTermsOfPrivacy') &&
              watch('agreedTermsOfMarketing')
            }
          />
          <CheckAllText>모두 동의하기</CheckAllText>
        </CheckButtonWrapper>
        <ListWrapper>
          <Controller
            name="agreedTermsOfService"
            control={control}
            render={({ field }) => (
              <ListItemWrapper>
                <CheckButtonWrapper
                  onClick={() => field.onChange(!field.value)}
                >
                  <CheckCircleIcon $checked={field.value} />
                  <CheckText>서비스 이용약관 동의 (필수)</CheckText>
                </CheckButtonWrapper>
                <ChevronRightIcon onClick={handleDetailTerms} />
              </ListItemWrapper>
            )}
          />
          <Controller
            name="agreedTermsOfPrivacy"
            control={control}
            render={({ field }) => (
              <ListItemWrapper>
                <CheckButtonWrapper
                  onClick={() => field.onChange(!field.value)}
                >
                  <CheckCircleIcon $checked={field.value} />
                  <CheckText>개인정보 수집 및 이용 동의 (필수)</CheckText>
                </CheckButtonWrapper>
                <ChevronRightIcon onClick={handleDetailTerms} />
              </ListItemWrapper>
            )}
          />
          <Controller
            name="agreedTermsOfMarketing"
            control={control}
            render={({ field }) => (
              <ListItemWrapper>
                <CheckButtonWrapper
                  onClick={() => field.onChange(!field.value)}
                >
                  <CheckCircleIcon $checked={field.value} />
                  <CheckText>마케팅 수신 동의 (선택)</CheckText>
                </CheckButtonWrapper>
                <ChevronRightIcon onClick={handleDetailTerms} />
              </ListItemWrapper>
            )}
          />
        </ListWrapper>
      </Wrapper>
    </Layer>
  );
};

export default TermsInputLayer;