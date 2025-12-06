import { render, screen, waitFor } from '../test/utils';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { wrapWithRelayEnvironment } from '../test/setup';
import { expect, test } from 'vitest';
import MineSweeper from './MineSweeper';
import { generateBoard } from '../domain.test';

function renderWithEnv(ui: React.ReactElement) {
  const env = createMockEnvironment();
  const wrapped = wrapWithRelayEnvironment(ui, env);
  render(wrapped);
  return env;
}

test('displays the mine sweeper board', async () => {
  const env = renderWithEnv(<MineSweeper />);

  env.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation, {
      MineSweeper: (slug) => ({
        board: {
          blocks: [generateBoard(16, 16)],
          slug: slug,
        },
      }),
    })
  );

  await waitFor(() => screen.getByText('Mine Sweeper'));

  expect(screen.getByText('Mine Sweeper')).toBeInTheDocument();
  expect(screen.getByTestId('board')).toBeInTheDocument();
});
