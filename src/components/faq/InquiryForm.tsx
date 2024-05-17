import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import TextArea from '../common/TextArea';
import { IInquiryFormValue } from '@/types/inquiry';

//#region Styled Component

const Wrapper = tw.div`
  flex
  h-[calc(100dvh-250px)]
  w-full
  flex-col
  gap-10
  overflow-y-auto
  pt-14
`;

const Label = tw.label`
  text-[14px]
  font-medium
  text-gray1
`;

//#endregion

const InquiryForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IInquiryFormValue>();

  return (
    <Wrapper>
      <Controller
        name="target"
        control={control}
        render={({ field }) => (
          <TextArea
            label={<Label>이용내역 선택</Label>}
            placeholder="내용을 입력해주세요"
            field={field}
            error={errors.target?.message}
          />
        )}
      />
      <Controller
        name="content"
        control={control}
        rules={{ required: '문의 내용을 입력해주세요' }}
        render={({ field }) => (
          <TextArea
            label={
              <Label>
                문의 내용 <span className="text-alert">(필수)</span>
              </Label>
            }
            placeholder="내용을 입력해주세요"
            field={field}
            error={errors.content?.message}
          />
        )}
      />
      <Controller
        name="imageUrls"
        control={control}
        render={({ field }) => (
          <TextArea
            label={<Label>사진 첨부 (최대 5장)</Label>}
            placeholder="내용을 입력해주세요"
            field={field}
            error={errors.imageUrls?.message}
          />
        )}
      />
    </Wrapper>
  );
};

export default InquiryForm;
