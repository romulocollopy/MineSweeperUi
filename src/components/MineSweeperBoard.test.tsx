import { describe, expect, test, vi } from 'vitest';
import { Board } from '../domain';
import { generateBoard } from '../domain.test';
import { render, waitFor } from '../test/utils';
import { MineSweeperBoard } from './MineSweeperBoard';

import userEvent from '@testing-library/user-event';

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
    const user = userEvent.setup();
    const screen = render(<MineSweeperBoard board={board} click={click} rightClick={rightClick} />);

    await waitFor(() => screen.getByTestId('board'));
    console.log(screen.debug());

    expect(screen.getByTestId('board')).toBeInTheDocument();

    expect(screen.getAllByRole('button').length).to.equal(30);

    for (const mine of screen.getAllByRole('button', { pressed: true })) {
      expect(mine).toBeInTheDocument();
      mine.click();
      expect(click).to.not.toBeCalled();
    }

    for (const mine of screen.getAllByRole('button', { pressed: false })) {
      expect(mine).toBeInTheDocument();

      await user.pointer({ target: mine, keys: '[MouseRight]' });
      expect(rightClick).to.toBeCalled();

      mine.click();
      expect(click).to.toBeCalled();
    }

    for (const mine of screen.getAllByRole('button', { pressed: false })) {
      expect(mine).toBeInTheDocument();
      mine.click();
      expect(click).to.toBeCalled();
    }
  });
});
