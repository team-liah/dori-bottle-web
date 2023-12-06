import Script from 'next/script';
import React, { useRef } from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '../common/CustomStyledComponent';
import { IMachine } from '@/types/machine';

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
  z-[1000]
  w-full
  p-4
`;

//#endregion

const dummy: IMachine[] = [
  {
    id: '018bbd4d-ebb0-7529-87f7-e5740b6e904b',
    no: 'ds',
    name: '나나나난',
    type: 'VENDING',
    address: {
      zipCode: '1001010',
      address1: '임시 주소ㅋㅋㅋㅋㅋ',
      address2: null,
    },
    capacity: 111,
    cupAmounts: 0,
    state: 'NORMAL',
    lng: 127.024612,
    lat: 37.5326,
    createdDate: '2023-11-11T07:34:42.352304Z',
    lastModifiedDate: '2023-11-11T07:34:42.352304Z',
  },
  {
    id: '018b039e-b7e0-3737-0ec2-4aba0ca55580',
    no: '111-1111',
    name: '삼성역점',
    type: 'VENDING',
    address: {
      zipCode: '12345',
      address1: '서울시',
      address2: '삼성동',
    },
    capacity: 100,
    cupAmounts: 0,
    state: 'NORMAL',
    lng: 127.024612,
    lat: 37.5326,
    createdDate: '2023-10-06T06:13:35.328328Z',
    lastModifiedDate: '2023-10-06T06:13:35.328329Z',
  },
];

type NaverMap = naver.maps.Map;
const mapId = 'map';

const MapModal = () => {
  const mapRef = useRef<NaverMap | null>(null);

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5326, 127.024612),
      zoom: 13,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={initializeMap}
      />
      <Wrapper>
        <div id={mapId} style={{ width: '100%', height: '100%' }} />
        <ButtonWrapper>
          <Custom.Button $style="primary" onClick={() => {}}>
            가까운 자판기 찾기
          </Custom.Button>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

export default MapModal;
