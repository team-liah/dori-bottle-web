import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import useModals from '@/hooks/useModals';
import { IOption } from '@/types/common';

interface ISelectProps {
  items: IOption[];
  value?: string;
  onChange: (value: string) => void;
}

//#region Styled Component

const Wrapper = tw.div`
  relative
`;

const SelectedWrapper = tw.div`
  flex
  h-[32px]
  w-[95px]
  flex-row
  items-center
  justify-between
  rounded-[10px]
  p-[7px]
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
  pt-[10px]
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

//#endregion

const SelectBottom = ({ items, value, onChange }: ISelectProps) => {
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

  const onClickItem = (value: string) => {
    onChange(value);
    closeModal(SelectItemWrapper);
  };

  return (
    <Wrapper>
      <SelectedWrapper onClick={toggleOpen}>
        <LabelText>
          {items.find((i) => i.value === value)?.label || items[0].label}
        </LabelText>
        <ChevronIcon />
      </SelectedWrapper>
    </Wrapper>
  );
};

interface ISelectItemProps {
  items: IOption[];
  value?: string;
  onClickItem: (value: string) => void;
}
const SelectItemWrapper = ({ items, value, onClickItem }: ISelectItemProps) => {
  return (
    <SelectList>
      {items.map((item) => (
        <SelectItem key={item.value} onClick={() => onClickItem(item.value)}>
          <SelectItemBackground>
            <LabelText>{item.label}</LabelText>
            {item.value === value && <CheckIcon />}
          </SelectItemBackground>
        </SelectItem>
      ))}
    </SelectList>
  );
};
export default SelectBottom;
