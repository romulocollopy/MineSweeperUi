import type { Coordinates, MineBlockDto } from './types';

export class MineBlock {
  coordinates: Coordinates;
  isBomb: boolean;

  constructor({ coordinates, isBomb }: { coordinates: Coordinates; isBomb: boolean }) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  getNeighbors(board: Board): MineBlock[] {
    const { x, y } = this.coordinates;

    // The 8 possible neighbor offsets
    const deltas = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    const result: MineBlock[] = [];

    for (const [dx, dy] of deltas) {
      const nx = x + dx;
      const ny = y + dy;

      const n = board.get(nx, ny);
      if (n) {
        result.push(n);
      }
    }

    return result;
  }

  bombsAround(board: Board): number {
    return [...this.getNeighbors(board).filter((b) => b.isBomb)].length;
  }
}

export class Board {
  blocks: MineBlock[];
  constructor({ blocks }: { blocks: MineBlock[] }) {
    this.blocks = blocks;
  }

  get(x: number, y: number) {
    return this.blocks.find((b) => b.coordinates.x === x && b.coordinates.y === y);
  }

  static fromDto = ({ blocks }: { blocks: MineBlockDto[] }) => {
    return new Board({ blocks: blocks.map((b) => new MineBlock(b)) });
  };
}

export interface MineSweeper {
  board: Board;
}
