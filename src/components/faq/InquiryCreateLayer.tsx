import React from 'react';
import { useFormContext } from 'react-hook-form';
import InquiryForm from './InquiryForm';
import * as Custom from '../common/CustomStyledComponent';
import Layer from '../common/Layer';
import { IInquiryFormValue } from '@/types/inquiry';

//#region Styled Component

//#endregion

const InquiryCreateLayer = () => {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext<IInquiryFormValue>();

  return (
    <Layer
      title="1:1 문의하기"
      footer={
        <Custom.Button type="submit" disabled={isSubmitting || !isValid}>
          문의하기
        </Custom.Button>
      }
    >
      <InquiryForm />
    </Layer>
  );
};

export default InquiryCreateLayer;
