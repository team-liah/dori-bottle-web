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
  font-normal
  tracking-[-0.48px]
  text-gray1
`;

const CheckAllText = tw(CheckText)`
  text-[16px]
`;

//#endregion

interface ITerm {
  id: keyof IRegisterFormInputs;
  text: string;
  link?: string;
}
const termsList: ITerm[] = [
  {
    id: 'agreedTermsOfAge',
    text: '만 14세 이상입니다 (필수)',
    link: '',
  },
  {
    id: 'agreedTermsOfService',
    text: '서비스 이용약관 동의 (필수)',
    link: '',
  },
  {
    id: 'agreedTermsOfPrivacy',
    text: '개인정보 수집 및 이용 동의 (필수)',
    link: '',
  },
  {
    id: 'agreedTermsOfLocation',
    text: '위치기반 서비스 약관 (필수)',
    link: '',
  },
  {
    id: 'agreedTermsOfMarketing',
    text: '마케팅 수신 동의 (선택)',
    link: '',
  },
];

const TermsInputLayer = ({ onClickBack }: ITermsInputLayerProps) => {
  const { openToast } = useToast();
  const { control, formState, watch, setValue } =
    useFormContext<IRegisterFormInputs>();

  const handleAllAgree = () => {
    if (
      !watch('agreedTermsOfAge') ||
      !watch('agreedTermsOfService') ||
      !watch('agreedTermsOfPrivacy') ||
      !watch('agreedTermsOfLocation') ||
      !watch('agreedTermsOfMarketing')
    ) {
      setValue('agreedTermsOfAge', true);
      setValue('agreedTermsOfService', true);
      setValue('agreedTermsOfPrivacy', true);
      setValue('agreedTermsOfLocation', true);
      setValue('agreedTermsOfMarketing', true);
    } else {
      setValue('agreedTermsOfAge', false);
      setValue('agreedTermsOfService', false);
      setValue('agreedTermsOfPrivacy', false);
      setValue('agreedTermsOfLocation', false);
      setValue('agreedTermsOfMarketing', false);
    }
  };

  const handleDetailTerms = (link?: string) => {
    if (link) {
      window.open(link);

      return;
    } else {
      openToast({
        component: '준비 중입니다.',
      });
    }
  };

  return (
    <Layer
      title="약관동의"
      footer={
        <Custom.Button
          type="submit"
          disabled={
            !watch('agreedTermsOfAge') ||
            !watch('agreedTermsOfService') ||
            !watch('agreedTermsOfPrivacy') ||
            !watch('agreedTermsOfLocation') ||
            formState.isSubmitting
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
              watch('agreedTermsOfAge') &&
              watch('agreedTermsOfService') &&
              watch('agreedTermsOfPrivacy') &&
              watch('agreedTermsOfLocation') &&
              watch('agreedTermsOfMarketing')
            }
          />
          <CheckAllText>모두 동의하기</CheckAllText>
        </CheckButtonWrapper>
        <ListWrapper>
          {termsList.map((item) => (
            <Controller
              key={item.id}
              name={item.id}
              control={control}
              render={({ field }) => (
                <ListItemWrapper>
                  <CheckButtonWrapper
                    onClick={() => field.onChange(!field.value)}
                  >
                    {/** @ts-ignore */}
                    <CheckCircleIcon $checked={field.value} />
                    <CheckText>{item.text}</CheckText>
                  </CheckButtonWrapper>
                  <ChevronRightIcon
                    onClick={() => handleDetailTerms(item.link)}
                  />
                </ListItemWrapper>
              )}
            />
          ))}
        </ListWrapper>
      </Wrapper>
    </Layer>
  );
};

export default TermsInputLayer;
