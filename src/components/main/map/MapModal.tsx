import { useQuery } from '@tanstack/react-query';
import Script from 'next/script';
import React, { useCallback, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import MachineInfo from './MachineInfo';
import * as Custom from '@/components/common/CustomStyledComponent';
import useMap from '@/hooks/useMap';
import { fetcher } from '@/service/fetch';
import { IMachine, MachineType } from '@/types/machine';
import { IMarker } from '@/types/map';

//#region Styled Component

const Wrapper = tw.div`
  relative
  flex
  h-[90vh]
  items-center
  justify-center
  bg-white
`;

const VerticalButtonWrapper = tw.div<{ $position: 'CENTER' | 'BOTTOM' }>`
  absolute
  ${({ $position }) =>
    $position === 'CENTER' ? 'bottom-[270px]' : 'bottom-[100px]'}
  right-[30px]
  z-[101]
  flex
  flex-col
  gap-4
  transition-all
`;

const BottomButtonWrapper = tw.div`
  absolute
  bottom-0
  z-[101]
  flex
  w-full
  flex-row
  items-end
  gap-4
  p-[30px]
`;

const FilterButtonWrapper = tw.div`
  flex
  w-[50px]
  flex-col
  items-center
  justify-center
  rounded-full
  bg-white
  px-2
  shadow-[0_0_8px_0px_rgba(17,17,17,0.12)]
  transition-all
`;

const FilterButton = tw.img`
  h-[50px]
  w-[50px]
  rounded-full
  p-1
  transition-all
`;

const MyLocationButton = tw.div`
  flex
  h-[50px]
  w-[50px]
  items-center
  justify-center
  rounded-full
  bg-white
  shadow-[0_0_8px_0px_rgba(17,17,17,0.12)]
  transition-all
`;

//#endregion
const MapModal = () => {
  const [mapLoading, setMapLoading] = useState(true);
  const [selectedMachineId, setSelectedMachineId] = useState<React.Key>();
  const [selectedFilter, setSelectedFilter] = useState<MachineType>();
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const {
    initializeMap,
    addMachineMarker,
    changeMarker,
    moveToMyLocation,
    moveToNearMachine,
  } = useMap();

  const { data } = useQuery<IMachine[]>({
    queryKey: ['machine'],
    queryFn: () => fetcher('/api/machine/all'),
  });

  const onReady = () => {
    initializeMap(() => {
      setSelectedMachineId(undefined);
    });
    setMapLoading(false);
  };

  const onChangeFilter = useCallback(
    (type: MachineType) => {
      if (selectedFilter && selectedFilter !== type) {
        setSelectedFilter(undefined);
      } else if (type === 'VENDING') {
        setSelectedFilter('COLLECTION');
      } else if (type === 'COLLECTION') {
        setSelectedFilter('VENDING');
      }
    },
    [selectedFilter],
  );

  useEffect(() => {
    if (mapLoading) return;
    data?.forEach((machine) => {
      const marker = addMachineMarker(machine, () => {
        setSelectedMachineId(machine.id);
        setSelectedFilter(machine.type);
      });
      if (!marker) return;
      setMarkers((prev) => [
        ...prev,
        {
          machine,
          marker,
        },
      ]);
    });
  }, [mapLoading, data, addMachineMarker]);

  useEffect(() => {
    markers.forEach((marker) =>
      changeMarker(
        marker,
        selectedMachineId === marker.machine.id,
        selectedFilter !== undefined && marker.machine.type !== selectedFilter,
      ),
    );
  }, [changeMarker, markers, selectedMachineId, selectedFilter]);

  const onClickNearMachine = (type: MachineType) => {
    const nearestMachine = moveToNearMachine(type, data);
    setSelectedMachineId(nearestMachine?.id);
    setSelectedFilter(type);
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={onReady}
      />
      <Wrapper>
        <div id={'map'} style={{ width: '100%', height: '100%' }} />
        <MachineInfo machineId={selectedMachineId} />
        <VerticalButtonWrapper
          $position={selectedMachineId ? 'CENTER' : 'BOTTOM'}
        >
          <FilterButtonWrapper>
            <FilterButton
              src="/svg/rental.svg"
              alt="필터"
              style={{
                opacity: selectedFilter !== 'COLLECTION' ? 1 : 0.3,
              }}
              onClick={() => onChangeFilter('VENDING')}
            />
            <Custom.Divider />
            <FilterButton
              src="/svg/collection.svg"
              alt="필터"
              style={{
                opacity: selectedFilter !== 'VENDING' ? 1 : 0.3,
              }}
              onClick={() => onChangeFilter('COLLECTION')}
            />
          </FilterButtonWrapper>
          <MyLocationButton onClick={moveToMyLocation}>
            <img src="/svg/current_location.svg" alt="내 위치" />
          </MyLocationButton>
        </VerticalButtonWrapper>
        <BottomButtonWrapper>
          <Custom.Button
            $style="primary"
            className="bg-point-yellow"
            onClick={() => onClickNearMachine('VENDING')}
          >
            가까운 자판기
          </Custom.Button>
          <Custom.Button
            $style="primary"
            onClick={() => onClickNearMachine('COLLECTION')}
          >
            가까운 반납함
          </Custom.Button>
        </BottomButtonWrapper>
      </Wrapper>
    </>
  );
};

export default MapModal;
