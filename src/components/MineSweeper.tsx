import { graphql, useLazyLoadQuery } from 'react-relay';
import type { MineSweeperQuery } from './__generated__/MineSweeperQuery.graphql';
import { type MineBlockDto } from '../types';
import { MineBlock } from '../domain';
import { generateBoard } from '../domain.test';

const MineSweeper = () => {
  let board;
  let data;
  try {
    data = useLazyLoadQuery<MineSweeperQuery>(
      graphql`
        query MineSweeperQuery {
          mineSweeper {
            board {
              blocks {
                coordinates {
                  x
                  y
                }
                isBomb
              }
            }
          }
        }
      `,
      {}
    );
  } catch {
    board = generateBoard(16, 16, 40);
  }

  board = data ? data.mineSweeper.board : board;

  return (
    <div>
      <h1>Mine Sweeper</h1>
      <MineSweeperBoard blocks={board} width={16} height={16}></MineSweeperBoard>
    </div>
  );
};

export default MineSweeper;

interface MineSweeperProps {
  blocks: MineBlockDto[];
  width: number;
  height: number;
}

export function MineSweeperBoard({ blocks, width, height }: MineSweeperProps) {
  // Convert flat list into a matrix: rows = x, columns = y
  const grid: MineBlock[][] = Array.from({ length: width }, () => Array.from({ length: height }));

  for (const block of blocks) {
    const { x, y } = block.coordinates;
    grid[x][y] = new MineBlock({ x, y }, block.isBomb);
  }

  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>
        {grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((block, colIndex) => (
              <td
                key={colIndex}
                style={{
                  border: '1px solid #ccc',
                  padding: '4px',
                  textAlign: 'center',
                  width: '20px',
                  height: '20px',
                  fontFamily: 'monospace',
                }}
              >
                {block?.isBomb ? '💣' : block.bombsAround()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
