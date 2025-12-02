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
  isFlagged: boolean;
  display: string;

  constructor({
    coordinates,
    display,
    isFlagged,
  }: {
    coordinates: Coordinates;
    display: string;
    isFlagged: boolean;
  }) {
    this.display = display;
    this.coordinates = coordinates;
    this.isFlagged = isFlagged;
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

  static fromDto = ({
    blocks,
    isFlagged,
    display,
  }: {
    blocks: MineBlockDto[];
    isFlagged: boolean;
    display: string;
  }) => {
    return new Board({ blocks: blocks.map((b) => new MineBlock(b)), isFlagged, display });
  };
}

export interface MineSweeper {
  board: Board;
}
