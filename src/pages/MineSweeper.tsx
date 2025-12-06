import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { MineSweeperBoard } from '../components/MineSweeperBoard';
import { DigitalDisplay } from '../components/DigitalDisplay';
import { Board, MineBlock } from '../domain';
import { useMineSweeperQuery, useUpdateBoard } from '../hooks/MineSweeper';
import { PaperH1Title, PaperLink, PaperSubtitle, PaperPage } from '../components/PaperComponents';
import { ResultModal } from '../components/ResultModal';

export default function MineSweeper() {
  const { gameSlug } = useParams();
  const slug = gameSlug || 'Our Game';
  const [params, _] = useSearchParams();
  const difficulty = params.get('difficulty') ?? 'medium';

  const [board, setBoard] = useState<Board>(new Board({ blocks: [], slug: '', flags: 0 }));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [startTime, setStartTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  const game = useMineSweeperQuery(slug, difficulty);
  const { sendBoardClick } = useUpdateBoard();

  useEffect(() => {
    setBoard(Board.fromDto(game));
    setGameOver(game.gameOver);
    setWon(game.won);
    setShowModal(game.gameOver || game.won);
    if (game.timeElapsed === 0) {
      setStartTime(Date.now());
    }
  }, [game]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const isGameActive = !gameOver && !won && board.blocks.length > 0;

    if (isGameActive) {
      interval = setInterval(() => {
        const currentTime = Math.floor((Date.now() - startTime) / 1000);
        setTimeElapsed(currentTime);
      }, 1000);
    } else if (gameOver || won) {
      setTimeElapsed(timeElapsed); // Keep the last recorded time
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameOver, won, board.blocks.length, startTime, timeElapsed]);

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
    <PaperPage className="flex flex-col items-center">
      <div className="max-w-max mx-auto">
        <PaperH1Title>Mine Sweeper</PaperH1Title>
        <PaperSubtitle>Game: {slug}</PaperSubtitle>
        <div className="mb-8 flex justify-between items-center px-4 py-3 border-4 border-gray-900 bg-gray-200 shadow-[6px_6px_0px_#1f2937] rounded-lg">
          <DigitalDisplay value={board.flags} label="Mines Left" />

          <PaperLink to={`/`} variant="secondary" className="text-base py-1 px-3">
            New Game
          </PaperLink>

          <DigitalDisplay value={timeElapsed} label="Time" />
        </div>
        {/* --------------------------- */}
        <div className="mx-auto">
          <MineSweeperBoard board={board} click={dig} rightClick={flag} />
        </div>
      </div>

      {showModal && (
        <ResultModal result={won ? 'win' : 'lose'} onClose={() => setShowModal(false)} />
      )}
    </PaperPage>
  );
}
