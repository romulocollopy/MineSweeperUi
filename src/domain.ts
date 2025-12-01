import type { Coordinates, MineBlockDto } from './types';

export class Boom extends Error {
  board: Board;
  constructor(message: string, newBoard: Board) {
    super(message);
    this.board = newBoard;
  }
}

export class MineBlock {
  coordinates: Coordinates;
  isBomb: boolean;
  display: string;

  constructor({ coordinates, display }: { coordinates: Coordinates; display?: string }) {
    this.display = display || '';
    this.coordinates = coordinates;
  }

  dig(board: Board) {
    console.log('dig!');
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
