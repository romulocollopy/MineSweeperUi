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

  get isRevealed() {
    return this.display !== '';
  }
}

export class Board {
  slug: string;
  flags: number;
  blocks: MineBlock[];
  timeElapsed: number;

  constructor({
    blocks,
    slug,
    flags,
    timeElapsed,
  }: {
    blocks: MineBlock[];
    slug: string;
    flags: number;
    timeElapsed?: number;
  }) {
    this.slug = slug;
    this.flags = flags;
    this.blocks = blocks;
    this.timeElapsed = timeElapsed ?? 0;
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
