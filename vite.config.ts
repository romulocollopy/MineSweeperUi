/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import relay from 'vite-plugin-relay';

export default defineConfig({
  plugins: [react(), relay],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/jest-setup.ts', './src/test/setup.tsx'],
    // Important: Transform GraphQL tags in tests
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
  },
});
