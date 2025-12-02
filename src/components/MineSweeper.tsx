import { useEffect, useState } from 'react';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { Link, useParams } from 'react-router-dom';
import { generateSlug } from 'random-word-slugs';

import { Board, MineBlock } from '../domain';

import type { MineSweeperQuery } from './__generated__/MineSweeperQuery.graphql';
import type { MineSweeperMutation } from './__generated__/MineSweeperMutation.graphql';
import { ResultModal } from './ResultModal';
import { boardStyles, styles } from './styles';
import type { Mutable } from '../types';

export default function MineSweeper() {
  const { gameSlug } = useParams();
  const slug = gameSlug || 'Our Game';

  const [board, setBoard] = useState<Board>(new Board({ blocks: [], slug: '', flags: 0 }));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const game = useMineSweeperQuery(slug);
  const { sendBoardClick } = useUpdateBoard();

  useEffect(() => {
    setBoard(Board.fromDto({ ...game }));
    setGameOver(game.gameOver);
    setWon(game.won);

    setShowModal(game.gameOver || game.won);
  }, [game]);

  const handleAction = (action: 'dig' | 'flag') => (block: MineBlock) => {
    if (gameOver) return;
    sendBoardClick(board.slug, block.coordinates, action, (newBoard, gameOver, won) => {
      setBoard(newBoard);
      setGameOver(gameOver);
      setWon(won);
      setShowModal(gameOver || won);
    });
  };

  const dig = handleAction('dig');
  const flag = handleAction('flag');

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💣 Mine Sweeper</h1>
      <h2 style={styles.subtitle}>Game: {slug}</h2>

      <Link style={styles.newGame} to={`/${generateSlug()}/`}>
        ➕ Start New Game
      </Link>

      <MineSweeperBoard board={board} click={dig} rightClick={flag} />

      {showModal && (
        <ResultModal result={won ? 'win' : 'lose'} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

interface MineSweeperProps {
  board: Board;
  click: (block: MineBlock) => void;
  rightClick: (block: MineBlock) => void;
}

export function MineSweeperBoard({ board, click, rightClick }: MineSweeperProps) {
  const [grid, setGrid] = useState<MineBlock[][]>([[]]);

  useEffect(() => {
    setGrid([...gridFromBoard(board)]);
  }, [board]);

  return (
    <div style={boardStyles.wrapper}>
      <table style={boardStyles.table}>
        <tbody>
          {grid.map((row, r) => (
            <tr key={r}>
              {row.map((block, c) => (
                <td
                  key={`${r}${c}`}
                  style={{
                    ...boardStyles.cell,
                    backgroundColor: block.isFlagged ? '#fffae6' : '#f0f0f0',
                    cursor: 'pointer',
                  }}
                  onClick={() => click(block)}
                  onContextMenu={(e) => {
                    e.preventDefault();
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
    </div>
  );
}

const MineSweeperQueryNode = graphql`
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
`;

function useMineSweeperQuery(slug: string) {
  const data = useLazyLoadQuery<MineSweeperQuery>(MineSweeperQueryNode, { slug });
  return data.mineSweeper as Mutable<typeof data.mineSweeper>;
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
            Board.fromDto(
              data.updateBoard.mineSweeper as Mutable<typeof data.updateBoard.mineSweeper>
            ),
            data.updateBoard.gameOver,
            data.updateBoard.won
          );
        }
      },
    });
  };

  return { sendBoardClick, isInFlight };
}

function gridFromBoard(board: Board) {
  if (!board.blocks || board.blocks.length === 0) {
    return [];
  }

  const maxX = Math.max(...board.blocks.map((b) => b.coordinates.x));
  const maxY = Math.max(...board.blocks.map((b) => b.coordinates.y));

  const grid: MineBlock[][] = Array.from({ length: maxX + 1 }, () =>
    Array.from({ length: maxY + 1 })
  );

  for (const block of board.blocks) {
    const { x, y } = block.coordinates;

    // Defensive check so tests never explode
    if (!grid[x]) grid[x] = [];
    grid[x][y] = block;
  }

  return grid;
}
