export type TabOptions =
  | "Code Editor"
  | "Upload Test"
  | "Upload Code"
  | "How to Use";

export const tabOptions: TabOptions[] = [
  "Code Editor",
  "Upload Test",
  "Upload Code",
  "How to Use",
] as const;

// TypeScript types do not exist at runtime so can't map over them!
// Use type assertion with an array.
