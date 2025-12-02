export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface MineBlockDto {
  coordinates: Coordinates;
  display: string;
  isFlagged: boolean;
}

export type Mutable<T> = {
  -readonly [P in keyof T]: Mutable<T[P]>;
};
