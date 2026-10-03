import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { readToken } from "@/lib/tokens";

// WCAG 2.x relative luminance and contrast ratio.
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(hexA, hexB) {
  const [lighter, darker] = [luminance(hexA), luminance(hexB)].sort(
    (a, b) => b - a,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

const css = readFileSync(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const token = (name) => readToken(css, name);

function expectContrast(foreground, background, minimum) {
  const fg = foreground === "white" ? "#FFFFFF" : token(foreground);
  const bg = token(background);
  const ratio = contrast(fg, bg);
  expect(
    ratio,
    `${foreground} ${fg} on ${background} ${bg} is ${ratio.toFixed(2)}:1, needs ${minimum}:1`,
  ).toBeGreaterThanOrEqual(minimum);
}

const SURFACES = ["background", "card"];
const TEXT_TOKENS = ["text-strong", "text-body", "text-muted", "accent-text"];
const NON_TEXT_TOKENS = ["accent-large", "focus-ring"];

const pairs = (foregrounds) =>
  SURFACES.flatMap((surface) => foregrounds.map((fg) => [fg, surface]));

describe("text contrast, WCAG AA 4.5:1", () => {
  it.each(pairs(TEXT_TOKENS))("%s on %s", (foreground, surface) => {
    expectContrast(foreground, surface, 4.5);
  });

  it.each(["accent-fill", "accent-fill-hover"])(
    "white label on %s",
    (fill) => {
      expectContrast("white", fill, 4.5);
    },
  );
});

describe("non-text contrast, WCAG AA 3:1", () => {
  it.each(pairs(NON_TEXT_TOKENS))("%s on %s", (foreground, surface) => {
    expectContrast(foreground, surface, 3);
  });
});

describe("token lookup", () => {
  it("names the missing token and the file when a token is absent", () => {
    const css = ":root { --background: #121212; }";
    expect(() => readToken(css, "text-strong")).toThrow(
      /--text-strong is missing from app\/globals\.css/,
    );
  });
});
