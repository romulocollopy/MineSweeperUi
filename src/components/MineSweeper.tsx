import { useEffect, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';

import { generateSlug } from 'random-word-slugs';

import { useMutation } from 'react-relay';
import { Board } from '../domain';

import { MineBlock } from '../domain';

import type { MineSweeperMutation } from './__generated__/MineSweeperMutation.graphql';
import type { MineSweeperQuery } from './__generated__/MineSweeperQuery.graphql';

const MineSweeper = () => {
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [board, setBoard] = useState<Board>(new Board({ blocks: [] }));
  const { sendBoardClick } = useUpdateBoard();
  const params = useParams();
  const resp = useLazyLoadQuery<MineSweeperQuery>(
    graphql`
      query MineSweeperQuery($slug: String!) {
        mineSweeper(slug: $slug) {
          slug
          flags
          gameOver
          won
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
    if (gameOver) {
      return;
    }
    const action = 'dig';
    sendBoardClick(board.slug, block.coordinates, action, (newBoard, gameOver, won) => {
      setBoard(newBoard);
      setGameOver(gameOver);
      setWon(won);
    });
  };

  const handleRightClick = (block: MineBlock) => {
    if (gameOver) {
      return;
    }
    const action = 'flag';
    sendBoardClick(board.slug, block.coordinates, action, (newBoard, gameOver, won) => {
      setBoard(newBoard);
      setGameOver(gameOver);
      setWon(won);
    });
  };

  useEffect(() => {
    setBoard(Board.fromDto(resp.mineSweeper));
    setGameOver(resp.mineSweeper.gameOver);
    setWon(resp.mineSweeper.won);
  }, []);

  return (
    <div>
      <h1>Mine Sweeper</h1>
      <h2>Welcome to the game {params.gameSlug}</h2>
      <p>
        <a href={`/${generateSlug()}/`}>new game</a>
      </p>
      {gameOver && <div>Game Over</div>}
      {won && <div>You won!</div>}
      <MineSweeperBoard
        board={board}
        click={click}
        rightClick={handleRightClick}
      ></MineSweeperBoard>
    </div>
  );
};

interface MineSweeperProps {
  board: Board;
  click: (block: MineBlock) => void;
  rightClick: (block: MineBlock) => void;
}

export function MineSweeperBoard({ board, click, rightClick }: MineSweeperProps) {
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
                onContextMenu={(event) => {
                  event.preventDefault();
                  rightClick(block);
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

const UpdateBlockMutation = graphql`
  mutation MineSweeperMutation($slug: String!, $coordinates: CoordinatesInput!, $action: String!) {
    updateBoard(slug: $slug, coordinates: $coordinates, action: $action) {
      mineSweeper {
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
      won
      gameOver
    }
  }
`;

function useUpdateBoard() {
  const [commit, isInFlight] = useMutation<MineSweeperMutation>(UpdateBlockMutation);

  const sendBoardClick = (
    slug: string,
    coordinates: { x: number; y: number },
    action: string,
    onCompleted: (board: Board, gameOver: boolean, won: boolean) => void
  ) => {
    commit({
      variables: { slug, coordinates, action },
      onCompleted: (data) => {
        if (data?.updateBoard) {
          onCompleted(
            Board.fromDto(data.updateBoard.mineSweeper),
            data.updateBoard.gameOver,
            data.updateBoard.won
          );
        }
      },
    });
  };

  return { sendBoardClick, isInFlight };
}
