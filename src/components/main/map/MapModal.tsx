import { useQuery } from '@tanstack/react-query';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';
import MachineInfo from './MachineInfo';
import * as Custom from '@/components/common/CustomStyledComponent';
import useMap from '@/hooks/useMap';
import { fetcher } from '@/service/fetch';
import { myLocationState } from '@/states/MyLocationState';
import { IMachine, MachineType } from '@/types/machine';

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
  const [myLocation] = useRecoilState(myLocationState);
  const [mapLoading, setMapLoading] = useState(true);
  const [markers, setMarkers] = useState<
    {
      machine: IMachine;
      marker: naver.maps.Marker;
    }[]
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<MachineType>();
  const {
    selectedMachineId,
    updateSelectedMarker,
    moveMap,
    initializeMap,
    addMachineMarker,
    changeMarker,
  } = useMap();

  const { data } = useQuery<IMachine[]>({
    queryKey: ['machine'],
    queryFn: () => fetcher('/api/machine/all'),
  });

  const onReady = () => {
    initializeMap();
    setMapLoading(false);
  };

  const onClickFilter = (type: MachineType) => {
    setSelectedFilter((prev) => {
      if (prev === type) return undefined;

      return type;
    });
  };

  const onClickMyLocation = () => {
    moveMap(myLocation.latitude, myLocation.longitude);
  };

  useEffect(() => {
    if (mapLoading) return;
    data?.forEach((machine) => {
      const marker = addMachineMarker(machine);
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
    markers.forEach((marker) => {
      marker.machine.type === selectedFilter || selectedFilter === undefined
        ? changeMarker(marker, 1)
        : changeMarker(marker, 0.3);
    });
  }, [changeMarker, markers, selectedFilter]);

  const onClickNearMachine = (type: MachineType) => {
    const nearestMachine = data?.reduce((prev: IMachine | null, curr) => {
      if (curr.type !== type) return prev;
      if (!prev) return curr;
      const prevDistance = Math.sqrt(
        Math.pow(prev.location.latitude - myLocation.latitude, 2) +
          Math.pow(prev.location.longitude - myLocation.longitude, 2),
      );
      const currDistance = Math.sqrt(
        Math.pow(curr.location.latitude - myLocation.latitude, 2) +
          Math.pow(curr.location.longitude - myLocation.longitude, 2),
      );

      return prevDistance < currDistance ? prev : curr;
    }, null);

    if (!nearestMachine) return;

    moveMap(
      nearestMachine.location.latitude,
      nearestMachine.location.longitude,
    );
    updateSelectedMarker(nearestMachine);
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
                opacity:
                  selectedFilter === undefined || selectedFilter === 'VENDING'
                    ? 1
                    : 0.3,
              }}
              onClick={() => onClickFilter('VENDING')}
            />
            <Custom.Divider />
            <FilterButton
              src="/svg/collection.svg"
              alt="필터"
              style={{
                opacity:
                  selectedFilter === undefined ||
                  selectedFilter === 'COLLECTION'
                    ? 1
                    : 0.3,
              }}
              onClick={() => onClickFilter('COLLECTION')}
            />
          </FilterButtonWrapper>
          <MyLocationButton onClick={onClickMyLocation}>
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
