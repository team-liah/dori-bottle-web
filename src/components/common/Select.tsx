import { motion } from 'framer-motion';
import React, { Fragment, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import tw from 'tailwind-styled-components';
import { MOTION } from '@/constants/MotionConstants';
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
  border-[1px]
  border-solid
  border-back-line
  p-[7px]
`;

const ChevronIcon = tw(FiChevronDown)<{ $open: boolean }>`
  w-[18px]
  h-[18px]
  text-gray2
  ${({ $open }) => $open && 'rotate-180'}
`;

const SelectList = tw(motion.div)`
  absolute
  top-[32px]
  left-0
  flex
  w-full
  flex-col
  rounded-[10px]
  bg-white
  shadow-[0_0_11px_0px_rgba(17,17,17,0.15)]
`;

const SelectItem = tw.div`
  flex
  w-full
  flex-row
  items-center
  justify-between
  p-[7px]
`;

const LabelText = tw.span`
  leadiing-[22px]
  text-[14px]
  font-medium
  tracking-[-0.42px]
  text-gray2
`;

const Dimmed = tw.div`
  fixed
  top-0
  left-0
  flex
  h-screen
  w-screen
`;

//#endregion

const Select = ({ items, value, onChange }: ISelectProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((current) => !current);
  };

  const onClickItem = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <Wrapper>
      <SelectedWrapper onClick={toggleOpen}>
        <LabelText>
          {items.find((i) => i.value === value)?.label || items[0].label}
        </LabelText>
        <ChevronIcon $open={open} />
      </SelectedWrapper>
      {open && (
        <Fragment>
          <Dimmed onClick={toggleOpen} />
          <SelectList {...MOTION.DROPDOWN}>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                onClick={() => onClickItem(item.value)}
              >
                <LabelText>{item.label}</LabelText>
              </SelectItem>
            ))}
          </SelectList>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Select;
