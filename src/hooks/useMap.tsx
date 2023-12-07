import { useCallback, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { myLocationState } from '@/states/MyLocationState';
import { IMachine } from '@/types/machine';

const useMap = () => {
  const myLocation = useRecoilValue(myLocationState);
  const mapRef = useRef<naver.maps.Map>();

  const [selectedMarker, setSelectedMarker] = useState<IMachine | null>(null);

  const updateSelectedMarker = useCallback((machine: IMachine) => {
    setSelectedMarker(machine);
  }, []);

  const moveMap = useCallback((lat: number, lng: number) => {
    mapRef.current?.morph(new window.naver.maps.LatLng(lat, lng), 16);
  }, []);

  const addCurrentLocationMarker = useCallback(() => {
    if (mapRef.current === undefined || myLocation.lat === 0) return;
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(myLocation.lat, myLocation.lng),
      map: mapRef.current,
      icon: {
        content:
          '<div style="width: 20px; height: 20px; background-color: #3a66de; border-radius: 50%; border: 3px solid white; box-shadow: 0px 0px 8px 0px black;"></div>',
        size: new window.naver.maps.Size(40, 40),
        origin: new window.naver.maps.Point(0, 0),
        anchor: new window.naver.maps.Point(20, 20),
      },
    });
  }, [myLocation.lat, myLocation.lng]);

  const addMachineMarker = useCallback(
    (machine: IMachine) => {
      if (mapRef.current === undefined) return;
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(machine.lat, machine.lng),
        map: mapRef.current,
        icon: {
          content: imageHtml(
            50,
            86,
            machine.type === 'VENDING'
              ? '/svg/pin_rental.svg'
              : '/svg/pin_collection.svg',
          ),
          size: new window.naver.maps.Size(40, 40),
          origin: new window.naver.maps.Point(0, 0),
          anchor: new window.naver.maps.Point(20, 20),
        },
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        moveMap(machine.lat, machine.lng);
        setSelectedMarker(machine);
      });
    },
    [moveMap],
  );

  const initializeMap = useCallback(() => {
    if (!window.naver.maps) return;
    const mapOptions = {
      center: new window.naver.maps.LatLng(
        myLocation.lat || 37.3595704,
        myLocation.lng || 127.105399,
      ),
      zoom: 13,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new window.naver.maps.Map('map', mapOptions);
    mapRef.current = map;

    window.naver.maps.Event.addListener(mapRef.current, 'click', () => {
      setSelectedMarker(null);
    });

    addCurrentLocationMarker();
  }, [addCurrentLocationMarker, myLocation.lat, myLocation.lng]);

  return {
    selectedMarker,
    updateSelectedMarker,
    moveMap,
    addMachineMarker,
    initializeMap,
  };
};
export default useMap;

const imageHtml = (width: number, height: number, imageLink: string) => {
  return `<div
    style="width: ${width}px; height: ${height}px; background-image: url(${imageLink}); background-repeat: no-repeat; background-position: center; background-size: contain;"
  />`;
};
