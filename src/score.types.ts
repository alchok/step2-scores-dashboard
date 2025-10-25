┘
export type LearnBlock = {
  purpose: string;
  formula?: string;
  criteria: Array<{ key: string; points?: number | string; note?: string }>;
  tiers?: Array<{ label: string; range: string }>;
  actions?: string[];
  caveats?: string[];
};

export type DrillCase = {
  stem: string[];
  options?: Array<{ id: string; label: string; value?: number }>; // optional checklist items
  fields?: Record<string, number | string>; // optional numeric/text values
  truth: { text: string; score?: number; tier?: string };
  explain: string[];
};

export type ScoreDef = {
  id: string;
  name: string;
  tags: string[]; // e.g., ["ED","Pulm"]
  learn: LearnBlock;
  drill: () => DrillCase;
};