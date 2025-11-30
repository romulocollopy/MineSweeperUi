import { render, screen, waitFor } from '@testing-library/react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import UserProfile from './UserProfile';
import { wrapWithRelayEnvironment } from '../test/setup';
import { expect, test } from 'vitest';

// Helper to render with a fresh mock environment and return it for further control
function renderWithEnv(ui: React.ReactElement) {
  const env = createMockEnvironment();
  const wrapped = wrapWithRelayEnvironment(ui, env);
  render(wrapped);
  return env;
}

test('displays user name after fetching data', async () => {
  const env = renderWithEnv(<UserProfile />);

  // Mock the query response
  env.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation, {
      User: () => ({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      }),
    })
  );

  // Wait for the component to update after the data is fetched
  await waitFor(() => screen.getByText('User Profile'));

  screen.debug();

  // Assert the user name is displayed
  expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
  expect(screen.getByText(/Email: john@example.com/i)).toBeInTheDocument();
});
