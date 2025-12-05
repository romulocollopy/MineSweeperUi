import { useEffect, useState } from 'react';
import { Board, MineBlock } from '../domain';
import { boardStyles } from './styles';

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
      <table style={boardStyles.table} data-testid="board">
        <tbody>
          {grid.map((row, x) => (
            <tr key={x}>
              {row.map((block, y) => (
                <td
                  id={`${x}-${y}`}
                  key={`${x}-${y}`}
                  style={{
                    ...boardStyles.cell,
                    backgroundColor: block.isFlagged ? '#fffae6' : '#f0f0f0',
                    cursor: 'pointer',
                  }}
                >
                  <Mine block={block} click={click} rightClick={rightClick} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface MineProps {
  block: MineBlock;
  click: (block: MineBlock) => void;
  rightClick: (block: MineBlock) => void;
}

function Mine({ block, click, rightClick }: MineProps) {
  return (
    <button
      onClick={() => click(block)}
      onContextMenu={(e) => {
        e.preventDefault();
        rightClick(block);
      }}
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
