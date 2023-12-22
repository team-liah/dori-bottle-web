import { atom } from 'recoil';

type Location = {
  latitude: number;
  longitude: number;
};

export const myLocationState = atom<Location>({
  key: 'myLocationState',
  default: {
    latitude: 0,
    longitude: 0,
  },
});
