import { describe, expect, test } from 'vitest';
import type { MineBlockDto } from './types';
import { generateBoard } from './components/MineSweeper';
import { Board, MineBlock } from './domain';

describe('Domain tests', () => {
  const boardDto = {
    blocks: [
      { coordinates: { x: 0, y: 0 }, isBomb: false },
      { coordinates: { x: 0, y: 1 }, isBomb: true },
      { coordinates: { x: 0, y: 2 }, isBomb: false },

      { coordinates: { x: 1, y: 0 }, isBomb: false },
      { coordinates: { x: 1, y: 1 }, isBomb: false },
      { coordinates: { x: 1, y: 2 }, isBomb: true },

      { coordinates: { x: 2, y: 0 }, isBomb: true },
      { coordinates: { x: 2, y: 1 }, isBomb: false },
      { coordinates: { x: 2, y: 2 }, isBomb: false },
    ],
  };

  // [
  //   [0, 1, 0],
  //   [1, 0, 0],
  //   [0, 0, 1],
  // ];

  test('Instantiates', () => {
    const board = Board.fromDto(boardDto);
    expect(board.blocks.length).to.equal(9);
  });

  test('get Neighbors', () => {
    const board = Board.fromDto(boardDto);

    const middleBlock = board.get(1, 1);
    expect(middleBlock?.getNeighbors(board).length).to.equal(8);

    const topLeft = board.get(0, 2);
    expect(topLeft?.getNeighbors(board).length).to.equal(3);
  });

  test('calculates bombsAround', () => {
    const board = Board.fromDto(boardDto);

    const middleBlock = board.get(1, 1);
    expect(middleBlock?.bombsAround(board)).to.equal(3);

    const topLeft = board.get(0, 2);
    expect(topLeft?.bombsAround(board)).to.equal(2);

    const topRight = board.get(2, 2);
    expect(topRight?.bombsAround(board)).to.equal(1);

    const bottomLeft = board.get(0, 0);
    expect(bottomLeft?.bombsAround(board)).to.equal(1);

    const bottomMiddle = board.get(1, 0);
    expect(bottomMiddle?.bombsAround(board)).to.equal(2);

    const bottomRight = board.get(2, 0);
    expect(bottomRight?.bombsAround(board)).to.equal(0);
  });
});

export function generateBoard(width: number, height: number, bombCount: number): MineBlockDto[] {
  const totalBlocks = width * height;

  if (bombCount > totalBlocks) {
    throw new Error('Bomb count cannot exceed total number of blocks');
  }

  // --- 1. Generate all coordinates ---
  const blocks: MineBlockDto[] = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      blocks.push({ coordinates: { x, y }, isBomb: false });
    }
  }

  // --- 2. Choose random bomb positions ---
  const bombIndexes = new Set<number>();
  while (bombIndexes.size < bombCount) {
    bombIndexes.add(Math.floor(Math.random() * totalBlocks));
  }

  // --- 3. Mark bombs ---
  for (const index of bombIndexes) {
    blocks[index].isBomb = true;
  }

  return blocks;
}
