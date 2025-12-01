import { describe, expect, test } from 'vitest';
import type { MineBlockDto } from './types';
import { Board } from './domain';

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

  const board = Board.fromDto(boardDto);

  // [
  //   [0, 1, 0],
  //   [1, 0, 0],
  //   [0, 0, 1],
  // ];

  test('Instantiates', () => {
    expect(board.blocks.length).to.equal(9);
  });

  test('get block from board', () => {
    const block = board.get(2, 0);
    block?.dig(board);
  });

  test('dig', () => {
    const block = board.get(2, 0);
    block?.dig(board);
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
