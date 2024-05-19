import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import useModals from '@/hooks/useModals';
import { IRental } from '@/types/rental';

interface IInquiryTargetSelectProps {
  label?: React.ReactNode;
  items: IRental[];
  value?: IRental;
  error?: string;
  onChange: (value: IRental) => void;
}

//#region Styled Component

const Wrapper = tw.div`
  relative
  flex
  w-full
  flex-col
  gap-4
`;

const SelectedWrapper = tw.div`
  flex
  w-full
  resize-none
  flex-row
  justify-between
  rounded-[15px]
  bg-back-color
  px-5
  py-4
  text-[12px]
  focus:outline-none
`;

const ChevronIcon = tw(FiChevronDown)`
  w-[18px]
  h-[18px]
  text-gray2
`;

const CheckIcon = tw(AiOutlineCheck)`
  w-[15px]
  h-[15px]
  text-main-blue
`;

const SelectList = tw(motion.div)`
  pt-[20px]
  bg-white
`;

const SelectItem = tw.div`
  flex
  w-full
  flex-row
  p-[5px]
`;

const SelectItemBackground = tw.div`
  flex
  w-full
  cursor-pointer
  flex-row
  items-center
  justify-between
  rounded-[10px]
  px-[15px]
  py-[10px]
  hover:bg-back-line
  active:bg-back-line
`;

const LabelText = tw.span`
  leadiing-[22px]
  text-[14px]
  font-medium
  tracking-[-0.42px]
  text-gray1
`;

const ErrorText = tw.span`
  font-Pretendard
  absolute
  bottom-[-30px]
  left-[5px]
  text-[12px]
  font-medium
  text-alert
`;

//#endregion

const InquiryTargetSelect = ({
  label,
  items,
  value,
  error,
  onChange,
}: IInquiryTargetSelectProps) => {
  const { openModal, closeModal } = useModals();
  const toggleOpen = () => {
    openModal({
      component: SelectItemWrapper,
      position: 'bottom',
      props: {
        items,
        value,
        onClickItem,
      },
    });
  };

  const initialRental = items.find((i) => i.id === value?.id);

  const onClickItem = (value: IRental) => {
    onChange(value);
    closeModal(SelectItemWrapper);
  };

  const getRentalLabel = (rental?: IRental) => {
    if (!rental) return '';

    return `${rental.fromMachine.name} -> ${
      rental.toMachine ? rental.toMachine.name : '반납'
    }`;
  };

  return (
    <Wrapper>
      {label}
      <SelectedWrapper onClick={toggleOpen}>
        <LabelText>
          {initialRental ? getRentalLabel(initialRental) : '문의대상 선택'}
        </LabelText>
        <ChevronIcon />
      </SelectedWrapper>
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

interface ISelectItemProps {
  items: IRental[];
  value?: IRental;
  onClickItem: (value: IRental) => void;
}
const SelectItemWrapper = ({ items, value, onClickItem }: ISelectItemProps) => {
  return (
    <SelectList>
      {items.map((item) => (
        <SelectItem key={item.id} onClick={() => onClickItem(item)}>
          <SelectItemBackground>
            <LabelText>{item.no}</LabelText>
            {item.id === value?.id && <CheckIcon />}
          </SelectItemBackground>
        </SelectItem>
      ))}
    </SelectList>
  );
};
export default InquiryTargetSelect;
