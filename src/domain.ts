import type { Coordinates } from './types';

export class MineBlock {
  coordinates: Coordinates;
  isBomb: boolean;

  constructor(coordinates: Coordinates, isBomb: boolean) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  getNeighbors(board: Board): MineBlock[] {
    return [];
  }

  bombsAround(): number {
    return 0;
  }
}

export interface Board {
  blocks: { Coordinate: MineBlock };
}

export interface MineSweeper {
  board: Board;
}
