import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import InquiryTargetSelect from './InquiryTargetSelect';
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

const data: any[] = [
  {
    id: '018f2943-1a97-1536-bbdf-fc35eae3dd9d',
    no: 'MzcyNmUy',
    userId: '018d814d-7971-a503-d336-d78efaaaed7e',
    cupId: '018d814d-7c6f-1c20-9e2a-63b59386b592',
    fromMachine: {
      id: '018e01c3-77a9-1a73-9d2f-d1397dc67c9f',
      no: '10',
      name: '10',
      type: 'VENDING',
      address: {
        zipCode: '1',
        address1: '2',
        address2: '3',
      },
    },
    toMachine: null,
    withIce: true,
    cost: 2,
    succeededDate: null,
    expiredDate: '2024-04-30T06:55:14.679Z',
    status: 'FAILED',
    createdDate: '2024-04-29T09:50:14.679661Z',
  },
  {
    id: '018f2942-fe21-f928-9105-6d14fea9a9cc',
    no: 'ZmNmNWQ0',
    userId: '018d814d-7971-a503-d336-d78efaaaed7e',
    cupId: '018d814d-7c86-2745-b9d2-dce53cc3cdb5',
    fromMachine: {
      id: '018e01c3-77a9-1a73-9d2f-d1397dc67c9f',
      no: '10',
      name: '10',
      type: 'VENDING',
      address: {
        zipCode: '1',
        address1: '2',
        address2: '3',
      },
    },
    toMachine: null,
    withIce: true,
    cost: 2,
    succeededDate: null,
    expiredDate: '2024-04-30T06:55:07.393Z',
    status: 'FAILED',
    createdDate: '2024-04-29T09:50:07.394352Z',
  },
  {
    id: '018f2942-d4b9-587c-f804-2c2a50e8cf8d',
    no: 'ZDk3YTY1',
    userId: '018d814d-7971-a503-d336-d78efaaaed7e',
    cupId: '018d814d-7c9a-a222-792b-0064ebe7161d',
    fromMachine: {
      id: '018e01c3-77a9-1a73-9d2f-d1397dc67c9f',
      no: '10',
      name: '10',
      type: 'VENDING',
      address: {
        zipCode: '1',
        address1: '2',
        address2: '3',
      },
    },
    toMachine: null,
    withIce: true,
    cost: 2,
    succeededDate: null,
    expiredDate: '2024-04-30T06:55:56.793Z',
    status: 'FAILED',
    createdDate: '2024-04-29T09:49:56.794514Z',
  },
];

const InquiryForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IInquiryFormValue>();

  return (
    <Wrapper>
      <Controller
        name="originTarget"
        control={control}
        render={({ field }) => (
          <InquiryTargetSelect
            label={<Label>문의 대상</Label>}
            items={data}
            value={data.find((i) => i.id === field.value?.id)}
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
