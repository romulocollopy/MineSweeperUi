import { describe, test } from 'vitest';
import type { MineBlockDto } from './types';
import { generateBoard } from './components/MineSweeper';
import { MineBlock } from './domain';

describe('Domain tests', () => {
  const boardDto = generateBoard(16, 16, 40);

  test('Instantiates', () => {
    const board = boardDto.map((b) => new MineBlock(b.coordinates, b.isBomb));
    console.log(board);
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
