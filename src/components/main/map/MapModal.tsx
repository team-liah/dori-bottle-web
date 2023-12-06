import Script from 'next/script';
import React from 'react';
import { useRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';
import MachineInfo from './MachineInfo';
import { dummy } from './dummy';
import * as Custom from '@/components/common/CustomStyledComponent';
import useMap from '@/hooks/useMap';
import { myLocationState } from '@/states/MyLocationState';

//#region Styled Component

const Wrapper = tw.div`
  relative
  flex
  h-[90vh]
  items-center
  justify-center
  bg-white
`;

const ButtonWrapper = tw.div`
  absolute
  bottom-0
  z-[101]
  flex
  w-full
  flex-col
  items-end
  gap-4
  p-4
`;

const MyLocationButton = tw.div`
  flex
  h-[50px]
  w-[50px]
  items-center
  justify-center
  rounded-[25px]
  bg-white
  shadow-[0_0_8px_0px_rgba(17,17,17,0.12)]
`;

//#endregion
const MapModal = () => {
  const [myLocation] = useRecoilState(myLocationState);
  const {
    selectedMarker,
    updateSelectedMarker,
    moveMap,
    initializeMap,
    addMachineMarker,
  } = useMap();

  const onReady = () => {
    initializeMap();
    dummy.forEach((machine) => {
      addMachineMarker(machine);
    });
  };

  const onClickMyLocation = () => {
    moveMap(myLocation.lat, myLocation.lng);
  };

  const onClickNearMachine = () => {
    const nearestMachine = dummy.reduce((prev, curr) => {
      if (curr.type === 'COLLECTION') return prev;
      const prevDistance = Math.sqrt(
        Math.pow(prev.lat - myLocation.lat, 2) +
          Math.pow(prev.lng - myLocation.lng, 2),
      );
      const currDistance = Math.sqrt(
        Math.pow(curr.lat - myLocation.lat, 2) +
          Math.pow(curr.lng - myLocation.lng, 2),
      );

      return prevDistance < currDistance ? prev : curr;
    }, dummy[0]);

    moveMap(nearestMachine.lat, nearestMachine.lng);
    updateSelectedMarker(nearestMachine);
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
        <MachineInfo machine={selectedMarker} />
        <ButtonWrapper>
          <MyLocationButton onClick={onClickMyLocation}>
            <img src="/svg/current_location.svg" alt="내 위치" />
          </MyLocationButton>
          <Custom.Button $style="primary" onClick={onClickNearMachine}>
            가까운 자판기 찾기
          </Custom.Button>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

export default MapModal;
