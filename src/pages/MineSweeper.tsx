import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { generateSlug } from 'random-word-slugs';
import { useMineSweeperQuery, useUpdateBoard } from '../hooks/MineSweeper';
import { MineSweeperBoard } from '../components/MineSweeperBoard';
import { Board, MineBlock } from '../domain';

import { ResultModal } from '../components/ResultModal';
import { styles } from '../components/styles';

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
