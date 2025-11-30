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
  isBomb: boolean;
}
