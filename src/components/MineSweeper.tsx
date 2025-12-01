import { graphql, useLazyLoadQuery } from 'react-relay';
import type { MineSweeperQuery } from './__generated__/MineSweeperQuery.graphql';
import { type MineBlockDto } from '../types';
import { Board, MineBlock } from '../domain';
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
    board = { blocks: generateBoard(16, 16, 40) };
  }

  board = data ? Board.fromDto(data.mineSweeper) : Board.fromDto(board);

  return (
    <div>
      <h1>Mine Sweeper</h1>
      <MineSweeperBoard board={board} width={16} height={16}></MineSweeperBoard>
    </div>
  );
};

export default MineSweeper;

interface MineSweeperProps {
  board: Board;
  width: number;
  height: number;
}

export function MineSweeperBoard({ board, width, height }: MineSweeperProps) {
  const grid: MineBlock[][] = Array.from({ length: width }, () => Array.from({ length: height }));

  for (const block of board.blocks) {
    const { x, y } = block.coordinates;
    grid[x][y] = new MineBlock(block);
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
                {block?.isBomb ? '💣' : block.bombsAround(board)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
