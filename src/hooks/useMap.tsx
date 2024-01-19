import { useCallback, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { myLocationState } from '@/states/MyLocationState';
import { IMachine } from '@/types/machine';

const useMap = () => {
  const myLocation = useRecoilValue(myLocationState);
  const mapRef = useRef<naver.maps.Map>();

  const [selectedMachineId, setSelectedMachineId] = useState<React.Key | null>(
    null,
  );

  const updateSelectedMarker = useCallback((machine: IMachine) => {
    setSelectedMachineId(machine.id);
  }, []);

  const moveMap = useCallback((latitude: number, longitude: number) => {
    mapRef.current?.morph(
      new window.naver.maps.LatLng(latitude, longitude),
      16,
    );
  }, []);

  const addCurrentLocationMarker = useCallback(() => {
    if (mapRef.current === undefined || myLocation.latitude === 0) return;
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(
        myLocation.latitude,
        myLocation.longitude,
      ),
      map: mapRef.current,
      icon: {
        content:
          '<div style="width: 20px; height: 20px; background-color: #3a66de; border-radius: 50%; border: 3px solid white; box-shadow: 0px 0px 8px 0px black;"></div>',
        size: new window.naver.maps.Size(40, 40),
        origin: new window.naver.maps.Point(0, 0),
        anchor: new window.naver.maps.Point(20, 20),
      },
      zIndex: 100,
    });
  }, [myLocation.latitude, myLocation.longitude]);

  const addMachineMarker = useCallback(
    (machine: IMachine) => {
      if (mapRef.current === undefined) return;

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          machine.location.latitude,
          machine.location.longitude,
        ),
        map: mapRef.current,
        icon: {
          content: imageHtml(
            50,
            86,
            1,
            machine.type === 'VENDING'
              ? '/svg/pin_rental.svg'
              : '/svg/pin_collection.svg',
          ),
          size: new window.naver.maps.Size(40, 40),
          origin: new window.naver.maps.Point(0, 0),
          anchor: new window.naver.maps.Point(25, 70),
        },
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        moveMap(machine.location.latitude, machine.location.longitude);
        setSelectedMachineId(machine.id);
      });

      return marker;
    },
    [moveMap],
  );

  const changeMarker = useCallback(
    (
      marker: {
        machine: IMachine;
        marker: naver.maps.Marker;
      },
      opacity: number,
    ) => {
      const icon = marker.marker.getIcon();
      marker.marker.setIcon({
        ...icon,
        content: imageHtml(
          50,
          86,
          opacity,
          marker.machine.type === 'VENDING'
            ? '/svg/pin_rental.svg'
            : '/svg/pin_collection.svg',
        ),
      });
      marker.marker.setZIndex(opacity * 10);
    },
    [],
  );

  const initializeMap = useCallback(() => {
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
      setSelectedMachineId(null);
    });
    addCurrentLocationMarker();
  }, [addCurrentLocationMarker, myLocation.latitude, myLocation.longitude]);

  return {
    selectedMachineId,
    updateSelectedMarker,
    moveMap,
    addMachineMarker,
    initializeMap,
    changeMarker,
  };
};
export default useMap;

const imageHtml = (
  width: number,
  height: number,
  opacity: number,
  imageLink: string,
) => {
  return `<div
    style="width: ${width}px; height: ${height}px; background-image: url(${imageLink}); background-repeat: no-repeat; background-position: center; background-size: contain; opacity: ${opacity};"
  />`;
};
