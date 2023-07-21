import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import Radio from '../common/Radio';
import * as Custom from '@/components/common/CustomStyledComponent';
import Input from '@/components/common/Input';
import Layer from '@/components/common/Layer';
import { MOTION } from '@/constants/MotionConstants';
import { IRegisterFormInputs } from '@/types/user';
import { getOnlyNumber } from '@/utils/util';

//#region Styled Component

const Wrapper = tw.div`
  h-full
  flex
  w-full
  flex-col
  items-center
  justify-between
  gap-7
  pt-14
`;

const MotionWrapper = tw(motion.div)`
  w-full
`;

//#endregion

const RegisterInputLayer = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<IRegisterFormInputs>();

  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    if (step === 2) return;
    if (!watch('name')) return;
    if (step === 1 && watch('birthDate')?.length !== 8) return;
    setStep((prev) => prev + 1);
  };

  return (
    <Layer
      title="기본정보 입력"
      footer={<Custom.Button type="submit">다음</Custom.Button>}
    >
      <Wrapper>
        <Controller
          name="name"
          control={control}
          rules={{
            required: '이름을 입력해주세요.',
          }}
          render={({ field }) => (
            <Input
              label="이름을 입력해주세요"
              id="name"
              maxLength={20}
              autoFocus={true}
              error={errors.name?.message}
              field={{
                ...field,
                onBlur: () => {
                  field.onBlur();
                  handleNextStep();
                },
              }}
            />
          )}
        />

        <Controller
          name="birthDate"
          control={control}
          rules={{
            required: '생년월일을 입력해주세요.',
            pattern: {
              value: /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|1\d|2[0-9]|3[01])$/,
              message: '생년월일을 다시 확인해주세요.',
            },
          }}
          render={({ field }) =>
            step > 0 ? (
              <MotionWrapper {...MOTION.SLIDE}>
                <Input
                  placeholder="YYYYMMDD"
                  label="생년월일을 입력해주세요"
                  id="birthDate"
                  type="tel"
                  maxLength={8}
                  autoFocus={true}
                  error={errors.birthDate?.message}
                  field={{
                    ...field,
                    onChange: (e) => {
                      const value = getOnlyNumber(e.target.value);
                      field.onChange(value);
                    },
                    onBlur: () => {
                      field.onBlur();
                      handleNextStep();
                    },
                  }}
                />
              </MotionWrapper>
            ) : (
              <></>
            )
          }
        />
        <Controller
          name="gender"
          control={control}
          rules={{
            required: '성별을 선택해주세요.',
          }}
          render={({ field }) =>
            step > 1 ? (
              <MotionWrapper {...MOTION.SLIDE}>
                <Radio
                  label="성별을 선택해주세요"
                  id="gender"
                  options={[
                    { label: '여자', value: 'FEMALE' },
                    { label: '남자', value: 'MALE' },
                  ]}
                  error={errors.gender?.message}
                  field={field}
                />
              </MotionWrapper>
            ) : (
              <></>
            )
          }
        />
      </Wrapper>
    </Layer>
  );
};

export default RegisterInputLayer;
