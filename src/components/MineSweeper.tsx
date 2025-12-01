import { graphql, useLazyLoadQuery } from 'react-relay';
import type { MineSweeperQuery } from './__generated__/MineSweeperQuery.graphql';
import { Board, Boom, MineBlock } from '../domain';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useParams } from 'react-router-dom';

const MineSweeper = () => {
  const [running, setRunning] = useState(true);
  const [board, setBoard] = useState<Board>(new Board({ blocks: [] }));

  const params = useParams();
  const resp = useLazyLoadQuery<MineSweeperQuery>(
    graphql`
      query MineSweeperQuery($id: ID!) {
        mineSweeper(id: $id) {
          id
          blocks {
            coordinates {
              x
              y
            }
            display
          }
        }
      }
    `,
    { id: params.gameId }
  );

  useEffect(() => {
    setBoard(resp.mineSweeper);
  }, []);

  return (
    <div>
      <h1>Mine Sweeper</h1>
      <h2>Welcome to the game {params.gameId}</h2>
      {!running && <div>Game Over</div>}
      <MineSweeperBoard
        board={board}
        setBoard={setBoard}
        setRunning={setRunning}
      ></MineSweeperBoard>
    </div>
  );
};

interface MineSweeperProps {
  board: Board;
  setBoard: Dispatch<SetStateAction<Board>>;
  setRunning: (isRunning: boolean) => void;
}

export function MineSweeperBoard({ board, setRunning, setBoard }: MineSweeperProps) {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const newGrid = [...gridFromBoard(board)];
    setGrid(newGrid);
  }, [board]);

  const click = (block: MineBlock) => {
    let newBoard;
    try {
      newBoard = block.dig(board);
    } catch (err) {
      if (err instanceof Boom) {
        setRunning(false);
        newBoard = err.board;
      }
    }
    if (newBoard) {
      setBoard(newBoard);
    }
  };

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
