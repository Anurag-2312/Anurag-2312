// Shared button styles; each call site adds its own padding.
export const button =
  "inline-flex items-center gap-2 text-[0.8125rem] leading-none font-semibold tracking-wider uppercase focus-visible:focus-ring";

export const solidButton = `${button} h-12 bg-accent-fill text-white hover:bg-accent-fill-hover`;

export const outlineButton = `${button} h-12 border border-text-body text-text-strong hover:border-text-strong`;
