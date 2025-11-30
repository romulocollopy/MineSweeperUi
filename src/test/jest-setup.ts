import { vi } from 'vitest';

(globalThis as any).jest = {
  fn: vi.fn,
  spyOn: vi.spyOn,
};
