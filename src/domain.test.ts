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
  const blocks: MineBlockDto[] = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      blocks.push({ coordinates: { x, y }, display: '', isFlagged: false });
    }
  }

  return blocks;
}
