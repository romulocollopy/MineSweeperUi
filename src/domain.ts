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
    console.log(`dig! ${board}`);
  }
}

export class Board {
  slug: string;
  flags: number;
  blocks: MineBlock[];
  constructor({ blocks, slug, flags }: { blocks: MineBlock[]; slug: string; flags: number }) {
    this.slug = slug;
    this.flags = flags;
    this.blocks = blocks;
  }

  static fromDto = ({
    slug,
    blocks,
    flags,
  }: {
    slug: string;
    blocks: MineBlockDto[];
    flags: number;
  }) => {
    const mineBlocks = blocks.map((b) => new MineBlock(b));
    return new Board({ blocks: mineBlocks, flags, slug });
  };
}

export interface MineSweeper {
  board: Board;
}
