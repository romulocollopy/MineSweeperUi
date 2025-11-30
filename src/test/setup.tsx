// src/test/setup.tsx
import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { ReactElement } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { createMockEnvironment, MockEnvironment } from 'relay-test-utils';

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Provide a Jest-compat shim in case some libs expect global jest
// Note: You already set this in jest-setup.ts, but keeping it safe here is harmless.
(globalThis as any).jest = (globalThis as any).jest || {
  fn: vi.fn,
  spyOn: vi.spyOn,
};

// Helper to wrap UI with a Relay environment. Accepts an optional env for tests to control.
export function wrapWithRelayEnvironment(ui: ReactElement, env?: MockEnvironment) {
  const environment = env ?? createMockEnvironment();
  return <RelayEnvironmentProvider environment={environment}>{ui}</RelayEnvironmentProvider>;
}
