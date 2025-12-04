import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';

export function createRelayTestEnvironment() {
  return createMockEnvironment();
}

export function resolveMostRecentRelayOperation(
  mockEnvironment: ReturnType<typeof createMockEnvironment>,
  mockResolvers = {}
) {
  mockEnvironment.mock.resolveMostRecentOperation((operation) =>
    MockPayloadGenerator.generate(operation, mockResolvers)
  );
}

export function resolveAllRelayOperations(
  mockEnvironment: ReturnType<typeof createMockEnvironment>,
  mockResolvers = {}
) {
  mockEnvironment.mock.resolveAllOperations((operation) =>
    MockPayloadGenerator.generate(operation, mockResolvers)
  );
}
