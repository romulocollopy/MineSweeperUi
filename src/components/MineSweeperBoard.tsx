import { useEffect, useState } from 'react';
import { Board, MineBlock } from '../domain';

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
    <div className="sm:min-w-96">
      <ul data-testid="board" className="mx-auto w-min">
        {grid.map((row, x) => (
          <li key={`x-${x}`} id={`x-${x}`}>
            <ul className="flex">
              {row.map((block, y) => (
                <li id={`x-${x}-y-${y}`} key={`x-${x}-y-${y}`}>
                  <Mine block={block} click={click} rightClick={rightClick} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface MineProps {
  block: MineBlock;
  click: (block: MineBlock) => void;
  rightClick: (block: MineBlock) => void;
}

function Mine({ block, click, rightClick }: MineProps) {
  const baseStyle =
    'w-5 sm:w-8 h-5 sm:h-8 text-sm sm:text-lg font-bold flex items-center justify-center ' +
    'cursor-pointer select-none transition-all duration-50 ease-in-out block';

  const unrevealedStyle =
    'bg-gray-300 text-gray-900 border-gray-900 ' +
    'sm:border-2 border-1 shadow-[4px_4px_0px_#1f2937] ' +
    'hover:bg-gray-400 hover:shadow-[5px_5px_0px_#1f2937] ' +
    'active:shadow-[1px_1px_0px_#1f2937] active:translate-x-1 active:translate-y-1';

  const revealedStyle =
    'bg-white text-gray-900 text-center ' +
    'border-1 border-gray-400 ' +
    'shadow-inner shadow-gray-300 cursor-default';

  let contentStyle = {
    '1': 'text-blue-600',
    '2': 'text-green-600',
    '3': 'text-red-600',
    '4': 'text-indigo-600',
    '5': 'text-yellow-700',
    '6': 'text-cyan-600',
    '7': 'text-black',
    '8': 'text-gray-800',
    '-': 'text-gray-900',
  }[block.display];

  contentStyle = contentStyle ? contentStyle + ' p-2' : 'text-gray-900 xs-p0';

  const currentStyle = block.isRevealed ? revealedStyle : unrevealedStyle;

  return (
    <button
      className={`${baseStyle} ${currentStyle} ${contentStyle}`}
      onClick={() => {
        if (!block.isRevealed) {
          click(block);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        rightClick(block);
      }}
      // Disable the button entirely if it is revealed
      disabled={block.clickDisable}
      aria-pressed={block.isRevealed}
    >
      {block.display}
    </button>
  );
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
