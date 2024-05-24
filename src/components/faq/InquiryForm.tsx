import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import InquiryTargetSelect from './InquiryTargetSelect';
import MultiFileUpload from '../common/MultiFileUpload';
import TextArea from '../common/TextArea';
import { fetcher } from '@/service/fetch';
import { IInquiryFormValue } from '@/types/inquiry';
import { IRentalList } from '@/types/rental';

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

  const { data } = useInfiniteQuery<IRentalList>({
    queryKey: ['rental'],
    queryFn: ({ pageParam = 0 }) =>
      fetcher('/api/rental', {
        page: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageable.hasNext) {
        return lastPage.pageable.page + 1;
      }
    },
  });

  const rentalList = useMemo(
    () => data?.pages.flatMap((page) => page.content) || [],
    [data],
  );

  return (
    <Wrapper>
      <Controller
        name="originTarget"
        control={control}
        render={({ field }) => (
          <InquiryTargetSelect
            label={<Label>이용내역 선택</Label>}
            items={rentalList}
            value={rentalList.find((i) => i.id === field.value?.id)}
            onChange={(value) => field.onChange(value)}
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
          <MultiFileUpload
            label={<Label>사진 첨부 (최대 5장)</Label>}
            field={field}
            error={errors.imageUrls?.message}
          />
        )}
      />
    </Wrapper>
  );
};

export default InquiryForm;
