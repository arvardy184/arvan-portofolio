// One place for timing, so every movement on the site shares a rhythm.
const EASE = [0.22, 1, 0.36, 1] as const;

export const FEEDBACK = { duration: 0.16, ease: EASE };
export const REFLOW = { duration: 0.36, ease: EASE };
export const EXPAND = { duration: 0.5, ease: EASE };
