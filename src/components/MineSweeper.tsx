import { useEffect, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';

import { Board, MineBlock } from '../domain';
import type { MineSweeperQuery } from './__generated__/MineSweeperQuery.graphql';
import { useDigBlock } from './mutations';

const MineSweeper = () => {
  const [running, setRunning] = useState(true);
  const [board, setBoard] = useState<Board>(new Board({ blocks: [] }));
  const { dig } = useDigBlock();
  const params = useParams();
  const resp = useLazyLoadQuery<MineSweeperQuery>(
    graphql`
      query MineSweeperQuery($slug: String!) {
        mineSweeper(slug: $slug) {
          slug
          flags
          blocks {
            coordinates {
              x
              y
            }
            display
            isFlagged
          }
        }
      }
    `,
    { slug: params.gameSlug || 'Our Game' }
  );

  const click = (block: MineBlock) => {
    dig(board.slug, block.coordinates, (newBoard, gameOver) => {
      setBoard(newBoard);
      if (gameOver) setRunning(false);
    });
  };

  useEffect(() => {
    setBoard(resp.mineSweeper);
  }, []);

  return (
    <div>
      <h1>Mine Sweeper</h1>
      <h2>Welcome to the game {params.gameSlug}</h2>
      {!running && <div>Game Over</div>}
      <MineSweeperBoard
        board={board}
        setBoard={setBoard}
        setRunning={setRunning}
        click={click}
      ></MineSweeperBoard>
    </div>
  );
};

interface MineSweeperProps {
  board: Board;
  click: null;
}

export function MineSweeperBoard({ board, click }: MineSweeperProps) {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const newGrid = [...gridFromBoard(board)];
    setGrid(newGrid);
  }, [board]);

  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>
        {grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((block, colIndex) => (
              <td
                key={`${rowIndex}${colIndex}`}
                style={{
                  border: '1px solid #ccc',
                  padding: '4px',
                  textAlign: 'center',
                  width: '20px',
                  height: '20px',
                  fontFamily: 'monospace',
                }}
                onClick={() => {
                  click(block);
                }}
              >
                {block.display}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MineSweeper;

function gridFromBoard(board: Board) {
  const width = Math.max(...board.blocks.map((b) => b.coordinates.x + 1));
  const height = Math.max(...board.blocks.map((b) => b.coordinates.y + 1));
  const grid: MineBlock[][] = Array.from({ length: width }, () => Array.from({ length: height }));

  for (const block of board.blocks) {
    const { x, y } = block.coordinates;
    grid[x][y] = block;
  }
  return grid;
}
