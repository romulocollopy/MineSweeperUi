import { render, waitFor } from '../test/utils';
import { expect, test } from 'vitest';
import HomePage from './HomePage';

test('<HomePage>', async () => {
  const screen = render(<HomePage />);

  await waitFor(() => screen.getByText('Welcome to Mine Sweeper'));

  expect(screen.getByText('Welcome to Mine Sweeper')).toBeInTheDocument();
});
