import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BsTriangleFill } from 'react-icons/bs';
import tw from 'tailwind-styled-components';
import Input from '../common/Input';
import * as Custom from '@/components/common/CustomStyledComponent';
import Layer from '@/components/common/Layer';
import { IInviteRegisterFormInputs } from '@/types/user';

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-col
  items-center
  gap-5
  pt-10
`;

const Title = tw.div`
  mb-5
  whitespace-pre-line
  text-center
  text-[24px]
  font-bold
  leading-[32px]
  tracking-[-0.72px]
  text-main-text
`;

const Icon = tw.img`
  h-[140px]
`;

const BulletTextContainer = tw.ul`
  mt-5
  flex
  w-full
  list-outside
  list-disc
  flex-col
  gap-1
  px-5
`;

const BulletText = tw.li`
  text-[12px]
  font-normal
  leading-[22px]
  tracking-[-0.36px]
  text-gray1
`;

const CharacterWrapper = tw.div`
  flex
  flex-col
  items-center
  justify-center
  gap-5
`;

const BubbleText = tw.div`
  relative
  flex
  w-[280px]
  items-center
  justify-center
  whitespace-pre-line
  rounded-[28px]
  bg-[#F5F5F5]
  py-5
  text-center
  text-[16px]
  leading-[22px]
  tracking-[-0.48px]
`;

const Edge = tw(BsTriangleFill)`
  text-[#F5F5F5]
  translate-x-[-4px]
  rotate-180
  bottom-0
  absolute
  translate-y-[80%]
`;

//#endregion
const InviteRegisterLayer = () => {
  const router = useRouter();
  const {
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<IInviteRegisterFormInputs>();

  useEffect(() => {
    console.log(router.asPath);
  }, [router.asPath]);

  return (
    <Layer
      title="초대장"
      onClickBack={() => {
        router.push('/');
      }}
      footer={
        <Custom.Button
          type="submit"
          disabled={watch('invitationCode')?.length !== 6 || isSubmitting}
        >
          완료
        </Custom.Button>
      }
    >
      <Wrapper>
        <Title>{'친구의 초대코드가 있나요?'}</Title>
        <CharacterWrapper>
          <BubbleText>
            <span>
              {'초대코드를 입력하면\n'}
              <b>무료 버블 10개</b>가 지급돼요!
            </span>
            <Edge />
          </BubbleText>
          <Icon src="/assets/character-default.png" />
        </CharacterWrapper>
        <Controller
          name="invitationCode"
          control={control}
          render={({ field }) => (
            <Input
              id="invitationCode"
              placeholder="코드 입력"
              maxLength={6}
              error={errors.invitationCode?.message}
              autoFocus={true}
              field={field}
            />
          )}
        />
        <BulletTextContainer>
          <BulletText>초대코드 등록은 최초 1회만 가능해요.</BulletText>
          <BulletText>
            초대코드 등록은 가입 후 2주일 이내에 등록해주세요.
          </BulletText>
          <BulletText>등록된 코드는 변경이 불가해요.</BulletText>
          <BulletText>
            등록 후 첫 이용을 하면, 초대장을 보낸 사람에게도 버블이 지급돼요.
          </BulletText>
        </BulletTextContainer>
      </Wrapper>
    </Layer>
  );
};

export default InviteRegisterLayer;
