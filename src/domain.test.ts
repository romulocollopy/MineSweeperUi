import { describe, expect, test } from 'vitest';
import type { MineBlockDto } from './types';
import { Board } from './domain';

describe('Domain tests', () => {
  const boardDto = {
    blocks: [
      { coordinates: { x: 0, y: 0 }, display: '', isFlagged: false },
      { coordinates: { x: 0, y: 1 }, display: '', isFlagged: false },
      { coordinates: { x: 0, y: 2 }, display: '', isFlagged: false },

      { coordinates: { x: 1, y: 0 }, display: '', isFlagged: false },
      { coordinates: { x: 1, y: 1 }, display: '', isFlagged: false },
      { coordinates: { x: 1, y: 2 }, display: '', isFlagged: false },
      { coordinates: { x: 2, y: 0 }, display: '', isFlagged: false },
      { coordinates: { x: 2, y: 1 }, display: '', isFlagged: false },
      { coordinates: { x: 2, y: 2 }, display: '', isFlagged: false },
    ],
    flags: 40,
    slug: '',
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
});

export function generateBoard(width: number, height: number): MineBlockDto[] {
  const totalBlocks = width * height;
  const flagsCount = Math.floor(totalBlocks * 0.1);
  const numbersCount = Math.floor(totalBlocks * 0.1);

  const blocks: MineBlockDto[] = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      blocks.push({ coordinates: { x, y }, display: '', isFlagged: false });
    }
  }

  const flagsIndexes = new Set<number>();
  const numbersIndex = new Set<number>();

  while (flagsIndexes.size < flagsCount) {
    flagsIndexes.add(Math.floor(Math.random() * totalBlocks));
  }

  while (numbersIndex.size < numbersCount) {
    numbersIndex.add(Math.floor(Math.random() * totalBlocks));
  }

  for (const index of flagsIndexes) {
    blocks[index].display = 'flag';
  }

  for (const index of numbersIndex) {
    blocks[index].display = Math.floor(Math.random() * 10).toString();
  }

  return blocks;
}
