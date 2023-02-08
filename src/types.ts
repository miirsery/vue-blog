export type UserType = {
  id: number;
  name: string;
  hobbies: {
    id: number;
    title: string;
  }[];
};
