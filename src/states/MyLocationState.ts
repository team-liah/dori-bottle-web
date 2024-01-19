import { atom } from 'recoil';
import { v4 as uuid } from 'uuid';

type Location = {
  latitude: number;
  longitude: number;
};

export const myLocationState = atom<Location>({
  key: `myLocationState/${uuid()}`,
  default: {
    latitude: 0,
    longitude: 0,
  },
});
