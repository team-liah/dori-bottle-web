import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import tw from 'tailwind-styled-components';
import { MOTION } from '@/constants/MotionConstants';
import { fetcher } from '@/service/fetch';
import {
  IMachine,
  getMachineStateLabel,
  getMachineTypeLabel,
} from '@/types/machine';

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
  flex-col
  gap-2
`;

const Title = tw.div`
  max-w-[200px]
  truncate
  text-base
  text-[24px]
  font-bold
  text-gray1
`;

const Text = tw.div`
  text-sm
  text-gray2
`;

const BoldText = tw.span`
  font-bold
`;

//#endregion

const MachineInfo = ({ machineId }: IMachineInfoProps) => {
  const { data: machine } = useQuery<IMachine>({
    enabled: machineId !== null,
    queryKey: ['machine', machineId],
    queryFn: () => fetcher(`/api/machine/${machineId}`),
  });

  return (
    <AnimatePresence>
      {machine && (
        <Container {...MOTION.POP}>
          {machine.type === 'COLLECTION' ? (
            <div className="h-[100px] w-[100px] rounded-lg bg-[url('/assets/machine-return.png')] bg-contain bg-center bg-no-repeat" />
          ) : (
            <div className="h-[100px] w-[100px] rounded-lg bg-[url('/assets/machine-rental.png')] bg-contain bg-center bg-no-repeat" />
          )}
          <InfoWrapper>
            <Title>
              {`${machine.name} ${getMachineTypeLabel(machine.type)}`}
            </Title>
            <Text>
              <BoldText>위치</BoldText>
              {` ${machine.address?.address1} ${
                machine.address?.address2 || ''
              }`}
            </Text>
            <Text>
              <BoldText>{getMachineStateLabel(machine.state)}</BoldText>
              {` ${machine.cupAmounts} / ${machine.capacity}`}
            </Text>
          </InfoWrapper>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default MachineInfo;
