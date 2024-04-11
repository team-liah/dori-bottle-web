import { useCallback, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useRecoilValue } from 'recoil';
import { myLocationState } from '@/states/MyLocationState';
import { IMachine, MachineType } from '@/types/machine';
import { IMarker } from '@/types/map';

const useMap = () => {
  const myLocation = useRecoilValue(myLocationState);
  const mapRef = useRef<naver.maps.Map>();

  const moveMap = useCallback((latitude: number, longitude: number) => {
    const currentZoom = mapRef.current?.getZoom() ?? 17;
    mapRef.current?.morph(
      new window.naver.maps.LatLng(latitude, longitude),
      currentZoom < 17 ? 17 : currentZoom,
    );
  }, []);

  // 현재 위치 마커 추가
  const addCurrentLocationMarker = useCallback(() => {
    if (mapRef.current === undefined || myLocation.latitude === 0) return;
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(
        myLocation.latitude,
        myLocation.longitude,
      ),
      map: mapRef.current,
      icon: {
        content: renderToStaticMarkup(MyLocationComponent()),
        size: new window.naver.maps.Size(40, 40),
        origin: new window.naver.maps.Point(0, 0),
        anchor: new window.naver.maps.Point(20, 20),
      },
    });
  }, [myLocation.latitude, myLocation.longitude]);

  // 기계 마커 추가
  const addMachineMarker = useCallback(
    (machine: IMachine, onClickMachine: () => void) => {
      if (mapRef.current === undefined) return;
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          machine.location.latitude,
          machine.location.longitude,
        ),
        map: mapRef.current,
        icon: {
          content: renderToStaticMarkup(
            MarkerComponent({
              type: machine.type,
              selected: false,
              disabled: false,
            }),
          ),
          size: new window.naver.maps.Size(40, 40),
          origin: new window.naver.maps.Point(0, 0),
          anchor: new window.naver.maps.Point(20, 55),
        },
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        moveMap(machine.location.latitude, machine.location.longitude);
        onClickMachine();
      });

      return marker;
    },
    [moveMap],
  );

  // 마커 변경
  const changeMarker = useCallback(
    (marker: IMarker, selected: boolean, disabled: boolean) => {
      const icon = marker.marker?.getIcon();
      // TODO: 성능 개선 필요.
      marker.marker?.setIcon({
        ...icon,
        content: renderToStaticMarkup(
          MarkerComponent({
            type: marker.machine.type,
            selected,
            disabled,
          }),
        ),
      });
      if (selected) {
        marker.marker?.setZIndex(3);
      } else {
        marker.marker?.setZIndex(disabled ? 1 : 2);
      }
    },
    [],
  );

  // 지도 초기화
  const initializeMap = useCallback(
    (onClickMap: () => void) => {
      if (!window.naver.maps) return;
      const mapOptions = {
        center: new window.naver.maps.LatLng(
          myLocation.latitude || 37.3595704,
          myLocation.longitude || 127.105399,
        ),
        zoom: 13,
        minZoom: 9,
        scaleControl: false,
        mapDataControl: false,
      };

      const map = new window.naver.maps.Map('map', mapOptions);
      mapRef.current = map;

      window.naver.maps.Event.addListener(mapRef.current, 'click', () => {
        onClickMap();
      });
      addCurrentLocationMarker();
    },
    [addCurrentLocationMarker, myLocation.latitude, myLocation.longitude],
  );

  // 내 위치로 이동
  const moveToMyLocation = () => {
    moveMap(myLocation.latitude, myLocation.longitude);
  };

  // 가장 가까운 기계로 이동
  const moveToNearMachine = useCallback(
    (type: MachineType, data?: IMachine[]) => {
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

      if (nearestMachine) {
        moveMap(
          nearestMachine.location.latitude,
          nearestMachine.location.longitude,
        );
      }

      return nearestMachine;
    },
    [moveMap, myLocation.latitude, myLocation.longitude],
  );

  return {
    addMachineMarker,
    initializeMap,
    changeMarker,
    moveToMyLocation,
    moveToNearMachine,
  };
};

export default useMap;

interface IMarkerComponentProps {
  type: MachineType;
  selected: boolean;
  disabled: boolean;
}

const MarkerComponent = ({
  type,
  selected,
  disabled,
}: IMarkerComponentProps) => {
  return (
    <div
      className={`${selected && 'animate-bounce-scale'}`}
      style={{
        width: '40px',
        height: '70px',
        backgroundImage: `url(${
          type === 'VENDING'
            ? '/assets/pin_rental.png'
            : '/assets/pin_collection.png'
        })`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        opacity: disabled ? 0.3 : 1,
      }}
    />
  );
};

const MyLocationComponent = () => {
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: '#3a66de',
        borderRadius: '50%',
        border: '3px solid white',
        boxShadow: '0px 0px 8px 0px black',
      }}
    />
  );
};
