import { UserType } from './types';

export const users: UserType[] = [
  {
    id: 1,
    name: 'Alex',
    hobbies: [
      {
        id: 1,
        title: 'Drive a car',
      },
      {
        id: 2,
        title: 'playing the guitar',
      },
    ],
  },
  {
    id: 2,
    name: 'Nick',
    hobbies: [
      {
        id: 3,
        title: 'Drive a car',
      },
    ],
  },
];
