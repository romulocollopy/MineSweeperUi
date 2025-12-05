import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import type { ReactElement } from 'react';
import type { RenderOptions } from '@testing-library/react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };

export * from '@testing-library/react';
