import { render, waitFor } from '../test/utils';
import { describe, expect, test, vi } from 'vitest';
import { MineSweeperBoard } from './MineSweeperBoard';
import { Board } from '../domain';
import { generateBoard } from '../domain.test';

describe('<MineSweeperBoard>', () => {
  const [width, height] = [6, 5];
  const board = Board.fromDto({
    blocks: generateBoard(width, height),
    slug: 'my-nice-board',
    flags: width * height * 0.1,
  });

  const click = vi.fn();
  const rightClick = vi.fn();

  test('displays the mine sweeper board', async () => {
    const screen = render(<MineSweeperBoard board={board} click={click} rightClick={rightClick} />);

    await waitFor(() => screen.getByTestId('board'));
    console.log(screen.debug());

    expect(screen.getByTestId('board')).toBeInTheDocument();
    expect(screen.getByTestId('board')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { pressed: false })).toBeInTheDocument();
  });
});
