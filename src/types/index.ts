// Common types used across the application
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Experiment {
  id: string;
  name: string;
  variant: string;
  enabled: boolean;
}

// Feature flag types for growth experiments
export type FeatureFlags = {
  'new-onboarding-flow': boolean;
  'pricing-page-v2': boolean;
  'ai-suggestions': boolean;
};
