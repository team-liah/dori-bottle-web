import { atom } from 'recoil';

type Location = {
  lat: number;
  lng: number;
};

export const myLocationState = atom<Location>({
  key: 'myLocationState',
  default: {
    lat: 0,
    lng: 0,
  },
});
