import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import tw from 'tailwind-styled-components';
import { MOTION } from '@/constants/MotionConstants';
import { fetcher } from '@/service/fetch';
import { IMachine, getMachineTypeLabel } from '@/types/machine';

interface IMachineInfoProps {
  machineId?: React.Key | null;
}

//#region Styled Component
const Container = tw(motion.div)`
  absolute
  bottom-0
  w-full
  px-[30px]
  pt-8
  pb-[112px]
  z-[101]
  bg-white
  rounded-t-[20px]
  flex
  flex-row
  gap-4
`;

const InfoWrapper = tw.div`
  flex
  w-full
  flex-col
  justify-between
`;

const Title = tw.div`
  m
  max-w-[200px]
  truncate
  text-[16px]
  font-bold
  text-gray1
`;

const Text = tw.div`
  text-[11px]
  text-gray2
`;

const Tag = tw.div`
  w-fit
  min-w-[80px]
  rounded-full
  px-3
  py-1
  text-center
  text-sm
  text-white
`;

const Icon = tw.img`
  h-[16px]
  w-[15px]
`;

const BubbleCountWrapper = tw.div`
  flex
  flex-row
  items-center
  justify-center
  gap-[10px]
  rounded-full
  bg-back-color
  px-4
`;

const BubbleCountItem = tw.div`
  flex
  flex-row
  items-center
  gap-1
  whitespace-nowrap
  rounded-full
  bg-back-color
  text-[11px]
`;

//#endregion

const MachineInfo = ({ machineId }: IMachineInfoProps) => {
  const { data: machine } = useQuery<IMachine>({
    enabled: machineId !== undefined,
    queryKey: ['machine', machineId],
    queryFn: () => fetcher(`/api/machine/${machineId}`),
  });

  const breaked =
    machine?.state === 'MALFUNCTION' ||
    machine?.state === 'PAUSE' ||
    (machine?.type === 'COLLECTION' &&
      machine?.capacity <= machine?.cupAmounts) ||
    (machine?.type === 'VENDING' && machine?.cupAmounts < 1);

  return (
    <AnimatePresence>
      {machine && (
        <Container {...MOTION.POP}>
          <div className="max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px] overflow-hidden rounded-2xl">
            {machine.imageUrl ? (
              <img
                src={machine.imageUrl}
                alt="자판기 정보"
                className="h-[110px] w-full"
              />
            ) : (
              <div className="flex h-[110px] w-full items-center justify-center bg-gray-light text-xs text-white">
                이미지 준비중
              </div>
            )}
          </div>
          <InfoWrapper>
            <div className="flex flex-row justify-end gap-3">
              {machine.type === 'VENDING' && (
                <BubbleCountWrapper>
                  <BubbleCountItem>
                    <Icon src="/svg/normal_cup.svg" alt="bubble" />
                    버블 {machine.rentCupAmounts ?? 1}개
                  </BubbleCountItem>
                  <BubbleCountItem>
                    <Icon src="/svg/ice_cup.svg" alt="bubble" />
                    버블 {machine.rentIceCupAmounts ?? 2}개
                  </BubbleCountItem>
                </BubbleCountWrapper>
              )}
              <Tag
                className={
                  breaked
                    ? 'bg-unactivated'
                    : machine.type === 'VENDING'
                    ? 'bg-point-yellow'
                    : 'bg-main-blue'
                }
              >
                {machine.type === 'VENDING' &&
                  (breaked ? '점검 중' : '이용가능')}
                {machine.type === 'COLLECTION' &&
                  (breaked ? '반납불가' : '반납가능')}
              </Tag>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <Title>{`${machine.name}`}</Title>
                <Text>
                  {` ${machine.address?.address1} ${
                    machine.address?.address2 || ''
                  }`}
                </Text>
              </div>
              <Text className="text-[11px] tracking-[0.3px] text-unactivated">{`${getMachineTypeLabel(
                machine.type,
              )}번호 ${machine.no}`}</Text>
            </div>
          </InfoWrapper>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default MachineInfo;
